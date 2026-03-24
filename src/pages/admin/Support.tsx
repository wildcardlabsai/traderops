import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AdminSupport = () => {
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const { data } = await supabase
        .from("support_tickets")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const updateTicket = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status?: string; adminNotes?: string }) => {
      const update: any = {};
      if (status) update.status = status;
      if (adminNotes !== undefined) update.admin_notes = adminNotes;
      const { error } = await supabase.from("support_tickets").update(update).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Ticket updated");
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
    },
  });

  const statusColor = (s: string) => {
    switch (s) {
      case "open": return "bg-accent/10 text-accent";
      case "in_progress": return "bg-primary/10 text-primary";
      case "resolved": return "bg-success/10 text-success";
      case "closed": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "high": return "bg-destructive/10 text-destructive";
      case "medium": return "bg-accent/10 text-accent";
      case "low": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Support Tickets</h1>
        <p className="font-body text-muted-foreground mt-1">Manage dealer support requests</p>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 font-body text-muted-foreground">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-8 font-body text-muted-foreground">No support tickets yet</div>
        ) : (
          tickets.map((ticket: any) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              statusColor={statusColor}
              priorityColor={priorityColor}
              onUpdate={(data) => updateTicket.mutate({ id: ticket.id, ...data })}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TicketCard = ({ ticket, statusColor, priorityColor, onUpdate }: any) => {
  const [notes, setNotes] = useState(ticket.admin_notes || "");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl uppercase tracking-wide text-foreground">{ticket.subject}</h3>
            <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">{ticket.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="secondary" className={`${priorityColor(ticket.priority)} text-xs`}>{ticket.priority}</Badge>
            <Badge variant="secondary" className={`${statusColor(ticket.status)} text-xs`}>{ticket.status}</Badge>
          </div>
        </div>
        <div className="font-body text-xs text-muted-foreground/60 mt-2">
          {new Date(ticket.created_at).toLocaleDateString()}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border p-5 space-y-4">
          <div className="space-y-2">
            <label className="font-body text-sm text-foreground font-medium">Status</label>
            <Select value={ticket.status} onValueChange={(v) => onUpdate({ status: v })}>
              <SelectTrigger className="w-40 bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="font-body text-sm text-foreground font-medium">Admin Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background border-border/50 font-body min-h-[80px]"
              placeholder="Internal notes about this ticket..."
            />
            <Button size="sm" onClick={() => onUpdate({ adminNotes: notes })} className="gradient-primary text-primary-foreground font-display uppercase tracking-wider text-xs">
              Save Notes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
