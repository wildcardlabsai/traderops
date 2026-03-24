import { Truck, ArrowRight } from "lucide-react";

const movements = [
  { id: 1, vehicle: "2021 Ford Transit Custom", from: "Auction House, Measham", to: "Our Yard, Birmingham", status: "Delivered", date: "22 Mar 2026", driver: "Tom B." },
  { id: 2, vehicle: "2022 VW Golf 1.5 TSI", from: "Our Yard, Birmingham", to: "Quick Cars Ltd, Manchester", status: "In Transit", date: "23 Mar 2026", driver: "Steve R." },
  { id: 3, vehicle: "2020 BMW X3 xDrive20d", from: "Private Seller, London", to: "Our Yard, Birmingham", status: "Collected", date: "24 Mar 2026", driver: "Tom B." },
  { id: 4, vehicle: "2023 Vauxhall Corsa 1.2", from: "Our Yard, Birmingham", to: "City Motors, Nottingham", status: "Scheduled", date: "25 Mar 2026", driver: "Pending" },
  { id: 5, vehicle: "2022 Toyota Hilux", from: "Trade Auction, Leeds", to: "Our Yard, Birmingham", status: "Scheduled", date: "26 Mar 2026", driver: "Steve R." },
];

const Movements = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Movements</h1>
        <p className="font-body text-sm text-muted-foreground">Track vehicle collections and deliveries</p>
      </div>

      <div className="space-y-3">
        {movements.map((m) => (
          <div key={m.id} className="rounded-xl bg-card border border-border/50 p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">{m.vehicle}</h3>
                  <p className="font-body text-xs text-muted-foreground">{m.date} · {m.driver}</p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                m.status === "Delivered" ? "bg-success/10 text-success" :
                m.status === "In Transit" ? "bg-primary/10 text-primary" :
                m.status === "Collected" ? "bg-accent/10 text-accent" :
                "bg-muted text-muted-foreground"
              }`}>
                {m.status}
              </span>
            </div>
            <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
              <span className="flex-1 truncate">{m.from}</span>
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="flex-1 truncate text-right">{m.to}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movements;
