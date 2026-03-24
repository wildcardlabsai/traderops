import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const listings = [
  { id: 1, vehicle: "2022 Ford Ranger Wildtrak", price: "£28,500", mileage: "19,200", location: "Birmingham", seller: "Midlands Trade Cars", age: "2h ago" },
  { id: 2, vehicle: "2021 VW Transporter T6.1", price: "£24,000", mileage: "38,400", location: "Manchester", seller: "NW Fleet Sales", age: "4h ago" },
  { id: 3, vehicle: "2023 Audi A3 Sportback", price: "£19,800", mileage: "11,600", location: "London", seller: "Capital Motors", age: "6h ago" },
  { id: 4, vehicle: "2020 Land Rover Discovery Sport", price: "£21,500", mileage: "44,300", location: "Leeds", seller: "Yorkshire Autos", age: "1d ago" },
  { id: 5, vehicle: "2022 Citroen Berlingo Enterprise", price: "£14,200", mileage: "26,800", location: "Bristol", seller: "SW Commercial", age: "1d ago" },
  { id: 6, vehicle: "2021 Hyundai Tucson 1.6 T-GDi", price: "£17,900", mileage: "31,200", location: "Glasgow", seller: "Scottish Trade Hub", age: "2d ago" },
];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const filtered = listings.filter(l => l.vehicle.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Marketplace</h1>
        <p className="font-body text-sm text-muted-foreground">Trade-only vehicle listings from the network</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search marketplace..." className="pl-9 bg-card border-border/50 font-body" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" size="icon" className="border-border/50 text-muted-foreground">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-xl bg-card border border-border/50 p-5 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-body text-muted-foreground">{l.age}</span>
              <span className="flex items-center gap-1 text-xs font-body text-muted-foreground">
                <MapPin className="w-3 h-3" /> {l.location}
              </span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{l.vehicle}</h3>
            <p className="font-body text-xs text-muted-foreground mb-4">{l.seller} · {l.mileage} miles</p>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold text-foreground">{l.price}</span>
              <Button size="sm" variant="outline" className="border-primary/30 text-primary text-xs hover:bg-primary/10">
                Make Offer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
