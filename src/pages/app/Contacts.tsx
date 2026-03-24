import { Button } from "@/components/ui/button";
import { Plus, Search, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const contacts = [
  { id: 1, name: "ABC Motors", type: "Buyer", contact: "Mike Johnson", phone: "07700 900123", email: "mike@abcmotors.co.uk", deals: 8, location: "Birmingham" },
  { id: 2, name: "Quick Cars Ltd", type: "Buyer", contact: "Sarah Williams", phone: "07700 900456", email: "sarah@quickcars.co.uk", deals: 5, location: "Manchester" },
  { id: 3, name: "Premier Autos", type: "Buyer & Supplier", contact: "Dave Thompson", phone: "07700 900789", email: "dave@premierautos.co.uk", deals: 12, location: "Leeds" },
  { id: 4, name: "Fleet Direct Ltd", type: "Supplier", contact: "Emma Clarke", phone: "07700 900321", email: "emma@fleetdirect.co.uk", deals: 3, location: "London" },
  { id: 5, name: "SW Commercial", type: "Supplier", contact: "Tom Baker", phone: "07700 900654", email: "tom@swcommercial.co.uk", deals: 6, location: "Bristol" },
  { id: 6, name: "City Motors", type: "Buyer", contact: "James Brown", phone: "07700 900987", email: "james@citymotors.co.uk", deals: 4, location: "Nottingham" },
];

const Contacts = () => {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Contacts</h1>
          <p className="font-body text-sm text-muted-foreground">Your buyers and suppliers network</p>
        </div>
        <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Contact
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-9 bg-card border-border/50 font-body" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

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
              <span className="font-body text-xs text-muted-foreground">{c.deals} deals</span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-0.5">{c.name}</h3>
            <p className="font-body text-sm text-muted-foreground mb-3">{c.contact} · {c.location}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground flex-1">
                <Phone className="w-3 h-3 mr-1" /> Call
              </Button>
              <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground flex-1">
                <Mail className="w-3 h-3 mr-1" /> Email
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
