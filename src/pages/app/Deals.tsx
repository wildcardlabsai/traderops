const stages = [
  {
    name: "Enquiry",
    color: "bg-muted-foreground",
    deals: [
      { vehicle: "2022 Kia Sportage 1.6 T-GDi", party: "Fleet Direct Ltd", value: "£19,500" },
    ],
  },
  {
    name: "Negotiating",
    color: "bg-accent",
    deals: [
      { vehicle: "2021 Ford Transit Custom", party: "ABC Motors", value: "£18,500" },
      { vehicle: "2022 VW Golf 1.5 TSI", party: "Quick Cars Ltd", value: "£14,200" },
    ],
  },
  {
    name: "Agreed",
    color: "bg-primary",
    deals: [
      { vehicle: "2023 Vauxhall Corsa 1.2", party: "City Motors", value: "£11,400" },
      { vehicle: "2020 BMW X3 xDrive20d", party: "Premier Autos", value: "£22,800" },
      { vehicle: "2021 Peugeot Partner BlueHDi", party: "SW Vans", value: "£12,800" },
    ],
  },
  {
    name: "Invoiced",
    color: "bg-success",
    deals: [
      { vehicle: "2022 Toyota Hilux Invincible", party: "Farm Fleet Co", value: "£29,000" },
    ],
  },
];

const Deals = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Deal Pipeline</h1>
        <p className="font-body text-sm text-muted-foreground">Track every deal from first contact to completion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage.name} className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
              <span className="font-display text-sm font-semibold text-foreground">{stage.name}</span>
              <span className="font-body text-xs text-muted-foreground">({stage.deals.length})</span>
            </div>
            <div className="space-y-2">
              {stage.deals.map((deal, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all cursor-pointer">
                  <h4 className="font-body text-sm font-medium text-foreground mb-1">{deal.vehicle}</h4>
                  <p className="font-body text-xs text-muted-foreground mb-2">{deal.party}</p>
                  <div className="font-display text-sm font-bold text-foreground">{deal.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
