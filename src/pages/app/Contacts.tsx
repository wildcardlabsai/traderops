import { Button } from "@/components/ui/button";
import { Plus, Search, Phone, Mail, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import ContactForm from "@/components/app/ContactForm";

type Contact = Tables<"contacts">;

const Contacts = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const fetchContacts = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("company_name", { ascending: true });
    if (error) toast.error("Failed to load contacts");
    else setContacts(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Contact deleted"); fetchContacts(); }
  };

  const filtered = contacts.filter(c =>
    `${c.company_name} ${c.contact_name || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Contacts</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${contacts.length} contacts`}
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground font-display font-medium"
          onClick={() => { setEditContact(null); setFormOpen(true); }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Contact
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-9 bg-card border-border/50 font-body" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="text-center py-12 font-body text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 font-body text-muted-foreground">
          {contacts.length === 0 ? "No contacts yet. Add your first contact to get started." : "No contacts match your search."}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-xl bg-card border border-border/50 p-5 hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                  c.type === "Buyer" ? "bg-primary/10 text-primary" :
                  c.type === "Supplier" ? "bg-accent/10 text-accent" :
                  "bg-success/10 text-success"
                }`}>
                  {c.type}
                </span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => { setEditContact(c); setFormOpen(true); }}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-0.5">{c.company_name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-3">
                {c.contact_name || "—"}{c.location ? ` · ${c.location}` : ""}
              </p>
              <div className="flex gap-2">
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="flex-1">
                    <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground w-full">
                      <Phone className="w-3 h-3 mr-1" /> Call
                    </Button>
                  </a>
                )}
                {c.email && (
                  <a href={`mailto:${c.email}`} className="flex-1">
                    <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground w-full">
                      <Mail className="w-3 h-3 mr-1" /> Email
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ContactForm
        contact={editContact}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSaved={fetchContacts}
      />
    </div>
  );
};

export default Contacts;
