import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle2 } from "lucide-react";

const wantedPosts = [
  { id: 1, vehicle: "Ford Transit Custom 2020+", budget: "Up to £18k", notes: "Low mileage preferred, any colour", status: "Active", matches: 3, posted: "2 days ago" },
  { id: 2, vehicle: "VW Golf Mk8 1.5 TSI", budget: "£12k–£15k", notes: "Under 30k miles, no cat repairs", status: "Active", matches: 1, posted: "5 days ago" },
  { id: 3, vehicle: "BMW 3 Series 320d M Sport", budget: "Up to £22k", notes: "2021+, auto only", status: "Matched", matches: 5, posted: "1 week ago" },
  { id: 4, vehicle: "Citroen Berlingo / Peugeot Partner", budget: "£8k–£12k", notes: "2019+, enterprise spec preferred", status: "Active", matches: 0, posted: "3 days ago" },
  { id: 5, vehicle: "Mercedes Sprinter 314 LWB", budget: "Up to £25k", notes: "2020+, MWB also considered", status: "Active", matches: 2, posted: "1 day ago" },
];

const Wanted = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Wanted Board</h1>
          <p className="font-body text-sm text-muted-foreground">Post what you need. Get matched by the network.</p>
        </div>
        <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Post Wanted
        </Button>
      </div>

      <div className="space-y-3">
        {wantedPosts.map((p) => (
          <div key={p.id} className="rounded-xl bg-card border border-border/50 p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground">{p.vehicle}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-medium ${
                    p.status === "Matched" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                  }`}>
                    {p.status === "Matched" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {p.status}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{p.notes}</p>
                <div className="flex items-center gap-4 mt-3 font-body text-xs text-muted-foreground">
                  <span>Budget: <span className="text-foreground font-medium">{p.budget}</span></span>
                  <span>{p.matches} matches</span>
                  <span>Posted {p.posted}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground ml-4">
                View Matches
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wanted;
