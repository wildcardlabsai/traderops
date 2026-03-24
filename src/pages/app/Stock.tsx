import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, AlertTriangle, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const stockData = [
  { id: 1, make: "Ford", model: "Transit Custom 2.0 TDCi", year: 2021, mileage: "34,200", cost: "£16,500", asking: "£18,500", margin: "£2,000", status: "Available", urgent: false, daysInStock: 12 },
  { id: 2, make: "Volkswagen", model: "Golf 1.5 TSI Match", year: 2022, mileage: "18,400", cost: "£12,800", asking: "£14,500", margin: "£1,700", status: "Available", urgent: false, daysInStock: 8 },
  { id: 3, make: "BMW", model: "X3 xDrive20d M Sport", year: 2020, mileage: "52,100", cost: "£19,800", asking: "£22,800", margin: "£3,000", status: "Reserved", urgent: false, daysInStock: 5 },
  { id: 4, make: "Vauxhall", model: "Corsa 1.2 Turbo Elite", year: 2023, mileage: "8,200", cost: "£10,200", asking: "£11,800", margin: "£1,600", status: "Available", urgent: true, daysInStock: 31 },
  { id: 5, make: "Mercedes", model: "Sprinter 314 CDI LWB", year: 2020, mileage: "67,800", cost: "£21,000", asking: "£24,500", margin: "£3,500", status: "Available", urgent: true, daysInStock: 45 },
  { id: 6, make: "Nissan", model: "Qashqai 1.3 DIG-T Acenta", year: 2021, mileage: "29,400", cost: "£13,500", asking: "£15,200", margin: "£1,700", status: "Sold", urgent: false, daysInStock: 0 },
  { id: 7, make: "Toyota", model: "Hilux Invincible D-4D", year: 2022, mileage: "22,600", cost: "£26,500", asking: "£29,000", margin: "£2,500", status: "Available", urgent: false, daysInStock: 14 },
  { id: 8, make: "Peugeot", model: "Partner 1.5 BlueHDi", year: 2021, mileage: "41,200", cost: "£11,000", asking: "£12,800", margin: "£1,800", status: "Available", urgent: false, daysInStock: 20 },
];

const Stock = () => {
  const [search, setSearch] = useState("");
  const filtered = stockData.filter(v => 
    `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Stock</h1>
          <p className="font-body text-sm text-muted-foreground">{stockData.length} vehicles in stock</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/60 text-muted-foreground">
            <Megaphone className="w-3.5 h-3.5 mr-1.5" /> Broadcast
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stock..."
            className="pl-9 bg-card border-border/50 font-body"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="border-border/50 text-muted-foreground">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Vehicle", "Year", "Mileage", "Cost", "Asking", "Margin", "Days", "Status"].map(h => (
                  <th key={h} className="text-left p-4 font-body text-xs text-muted-foreground font-medium first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-2">
                      {v.urgent && <AlertTriangle className="w-3.5 h-3.5 text-accent flex-shrink-0" />}
                      <div>
                        <div className="font-body text-sm font-medium text-foreground">{v.make} {v.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.year}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.mileage}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.cost}</td>
                  <td className="p-4 font-display text-sm font-medium text-foreground">{v.asking}</td>
                  <td className="p-4 font-display text-sm font-medium text-success">{v.margin}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.daysInStock || "—"}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      v.status === "Available" ? "bg-success/10 text-success" :
                      v.status === "Reserved" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;
