import { cn } from "@/lib/utils";

export default function DashboardCard({ children, title, icon: Icon, description, className }) {
    return (
        <div className={cn("p-[2px] rounded-xl bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] h-full shadow-2xl", className)}>
            <div className="bg-card border border-border rounded-xl  h-full flex flex-col relative text-card-foreground overflow-hidden">
                {/* Optional Header if title is provided */}
                {(title || Icon) && (
                    <div className="p-6 bg-muted/30 border-b border-border flex items-center gap-3 shrink-0">
                        {Icon && (
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                        )}
                        <div>
                            {title && <h2 className="text-xl font-bold">{title}</h2>}
                            {description && (
                                <p className="text-sm text-muted-foreground">{description}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
