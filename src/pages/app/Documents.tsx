import { FileText, Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DocumentForm from "@/components/app/DocumentForm";
import { format } from "date-fns";

const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("doc_date", { ascending: false });
    if (error) toast.error("Failed to load documents");
    else setDocuments(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Document deleted"); fetchDocuments(); }
  };

  const filtered = documents.filter(d =>
    `${d.name} ${d.vehicle_name || ""} ${d.party_name || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (n: number | null) => n ? `£${n.toLocaleString("en-GB")}` : "—";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Documents</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${documents.length} documents`}
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground font-display font-medium shadow-lg shadow-primary/20"
          onClick={() => { setEditDoc(null); setFormOpen(true); }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Document
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9 bg-card border-border/50 font-body"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                {["Document", "Vehicle", "Party", "Date", "Amount", ""].map(h => (
                  <th key={h} className="text-left p-3 md:p-4 font-body text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center">
                    <FileText className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-body text-sm text-muted-foreground">
                      {documents.length === 0 ? "No documents yet" : "No documents match your search"}
                    </p>
                    {documents.length === 0 && (
                      <p className="font-body text-xs text-muted-foreground/60 mt-1">Create your first invoice or receipt</p>
                    )}
                  </td>
                </tr>
              ) : filtered.map((d) => (
                <tr key={d.id} className="border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-body text-sm font-medium text-foreground">{d.name}</div>
                        <div className="font-body text-xs text-muted-foreground">{d.doc_type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 md:p-4 font-body text-sm text-muted-foreground">{d.vehicle_name || "—"}</td>
                  <td className="p-3 md:p-4 font-body text-sm text-muted-foreground">{d.party_name || "—"}</td>
                  <td className="p-3 md:p-4 font-body text-sm text-muted-foreground">
                    {d.doc_date ? format(new Date(d.doc_date), "dd MMM yyyy") : "—"}
                  </td>
                  <td className="p-3 md:p-4 font-display text-sm font-semibold text-foreground">{formatPrice(d.amount)}</td>
                  <td className="p-3 md:p-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => { setEditDoc(d); setFormOpen(true); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(d.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DocumentForm document={editDoc} open={formOpen} onOpenChange={setFormOpen} onSaved={fetchDocuments} />
    </div>
  );
};

export default Documents;
