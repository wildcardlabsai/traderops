import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const callerClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!, {
      global: { headers: { authorization: authHeader } },
    });

    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method === "GET") {
      if (action === "dealers") {
        // List all users with profiles
        const { data: profiles, error } = await adminClient
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Get auth user emails
        const { data: { users }, error: usersError } = await adminClient.auth.admin.listUsers();
        if (usersError) throw usersError;

        const enriched = (profiles || []).map((p: any) => {
          const authUser = users?.find((u: any) => u.id === p.user_id);
          return {
            ...p,
            email: authUser?.email,
            last_sign_in: authUser?.last_sign_in_at,
            email_confirmed: authUser?.email_confirmed_at != null,
          };
        });

        return new Response(JSON.stringify(enriched), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (action === "analytics") {
        const { count: totalDealers } = await adminClient
          .from("profiles")
          .select("*", { count: "exact", head: true });

        const { count: totalVehicles } = await adminClient
          .from("vehicles")
          .select("*", { count: "exact", head: true });

        const { count: totalDeals } = await adminClient
          .from("deals")
          .select("*", { count: "exact", head: true });

        const { count: openTickets } = await adminClient
          .from("support_tickets")
          .select("*", { count: "exact", head: true })
          .eq("status", "open");

        const { data: recentDealers } = await adminClient
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        return new Response(
          JSON.stringify({
            totalDealers: totalDealers || 0,
            totalVehicles: totalVehicles || 0,
            totalDeals: totalDeals || 0,
            openTickets: openTickets || 0,
            recentDealers: recentDealers || [],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (req.method === "POST" && action === "update-plan") {
      const { userId, planStatus, planExpiresAt } = await req.json();
      const { error } = await adminClient
        .from("profiles")
        .update({ plan_status: planStatus, plan_expires_at: planExpiresAt || null })
        .eq("user_id", userId);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
