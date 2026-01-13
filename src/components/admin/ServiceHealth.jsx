import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const SERVICES = [
    { name: "Order Service", status: "ok" },
    { name: "Payment Gateway", status: "ok" },
    { name: "Inventory SQL", status: "warning" },
    { name: "Notification Svc", status: "ok" },
];

const StatusIcon = ({ status }) => {
    if (status === "ok") return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "warning") return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
};

export default function ServiceHealth() {
    return (
        <div className="group bg-card text-card-foreground border border-border rounded-xl p-6 h-[220px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-transparent dark:hover:border-border">
            {/* M-Sport Hover Gradient Border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-300 -z-10 margin-[-1px]"></div>
            <div className="absolute inset-[1px] rounded-[11px] bg-card -z-10"></div>
            <h3 className="text-lg font-bold mb-4 shrink-0">System Health</h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {SERVICES.map((svc) => (
                    <div key={svc.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 shrink-0">
                        <span className="font-medium">{svc.name}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs uppercase bg-background/50 px-2 py-1 rounded text-muted-foreground">
                                {svc.status}
                            </span>
                            <StatusIcon status={svc.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
