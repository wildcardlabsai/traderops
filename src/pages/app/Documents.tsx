import { FileText, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  { id: 1, name: "Trade Invoice #1042", type: "Invoice", vehicle: "2021 Ford Transit Custom", party: "ABC Motors", date: "22 Mar 2026", amount: "£18,500" },
  { id: 2, name: "Trade Invoice #1041", type: "Invoice", vehicle: "2022 VW Golf 1.5 TSI", party: "Quick Cars Ltd", date: "20 Mar 2026", amount: "£14,200" },
  { id: 3, name: "Purchase Receipt #0987", type: "Receipt", vehicle: "2020 BMW X3 xDrive20d", party: "Auction Direct", date: "18 Mar 2026", amount: "£19,800" },
  { id: 4, name: "Trade Invoice #1040", type: "Invoice", vehicle: "2023 Vauxhall Corsa 1.2", party: "City Motors", date: "15 Mar 2026", amount: "£11,400" },
  { id: 5, name: "Purchase Receipt #0986", type: "Receipt", vehicle: "2022 Toyota Hilux", party: "Trade Auction Leeds", date: "12 Mar 2026", amount: "£26,500" },
];

const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Documents</h1>
          <p className="font-body text-sm text-muted-foreground">Trade invoices and purchase records</p>
        </div>
        <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Invoice
        </Button>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {["Document", "Vehicle", "Party", "Date", "Amount", ""].map(h => (
                <th key={h} className="text-left p-4 font-body text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">{d.name}</div>
                      <div className="font-body text-xs text-muted-foreground">{d.type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-body text-sm text-muted-foreground">{d.vehicle}</td>
                <td className="p-4 font-body text-sm text-muted-foreground">{d.party}</td>
                <td className="p-4 font-body text-sm text-muted-foreground">{d.date}</td>
                <td className="p-4 font-display text-sm font-semibold text-foreground">{d.amount}</td>
                <td className="p-4">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Download className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
