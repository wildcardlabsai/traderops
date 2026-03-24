import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle2, Pencil, Trash2, Search as SearchIcon, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import WantedForm from "@/components/app/WantedForm";
import { formatDistanceToNow } from "date-fns";

const Wanted = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editPost, setEditPost] = useState<any | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("wanted_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load wanted posts");
    else setPosts(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this wanted post?")) return;
    const { error } = await supabase.from("wanted_posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Post deleted"); fetchPosts(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Wanted Board</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${posts.length} wanted posts`}
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground font-display font-medium shadow-lg shadow-primary/20"
          onClick={() => { setEditPost(null); setFormOpen(true); }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Post Wanted
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 font-body text-muted-foreground">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <SearchIcon className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="font-body text-sm text-muted-foreground">No wanted posts yet</p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">Post what you're looking for and let the network find it</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="rounded-xl bg-card border border-border/40 p-5 hover:border-primary/20 card-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display font-semibold text-foreground">{p.vehicle_description}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-medium ${
                      p.status === "Matched" ? "bg-success/10 text-success" :
                      p.status === "Closed" ? "bg-muted text-muted-foreground" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {p.status === "Matched" ? <CheckCircle2 className="w-3 h-3" /> :
                       p.status === "Closed" ? <X className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {p.status}
                    </span>
                  </div>
                  {p.notes && <p className="font-body text-sm text-muted-foreground">{p.notes}</p>}
                  <div className="flex items-center gap-4 mt-3 font-body text-xs text-muted-foreground">
                    {p.budget && <span>Budget: <span className="text-foreground font-medium">{p.budget}</span></span>}
                    <span>{p.matches} matches</span>
                    <span>Posted {formatDistanceToNow(new Date(p.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => { setEditPost(p); setFormOpen(true); }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <WantedForm post={editPost} open={formOpen} onOpenChange={setFormOpen} onSaved={fetchPosts} />
    </div>
  );
};

export default Wanted;
