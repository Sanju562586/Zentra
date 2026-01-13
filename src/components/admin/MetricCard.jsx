import { Card } from "@/components/ui/card";
import Skeleton from "@/components/magicui/Skeleton";
import { motion } from "framer-motion";

export default function MetricCard({ title, value, change, icon, loading }) {
  return (
    <Card className="group p-6 bg-card text-card-foreground border border-border relative overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-transparent dark:hover:border-border">
      {/* M-Sport Hover Gradient Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-300 -z-10 margin-[-1px]"></div>
      <div className="absolute inset-[1px] rounded-[11px] bg-card -z-10"></div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        {icon}
      </div>

      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <div className="p-2 bg-muted/50 rounded-lg border border-border/50 text-primary">
            {icon}
          </div>
        </div>

        {loading ? (
          <Skeleton className="h-10 w-32 mt-4" />
        ) : (
          <div className="mt-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-foreground"
            >
              {value}
            </motion.p>

            {change !== undefined && (
              <p className={`text-xs mt-2 font-medium flex items-center gap-1 ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from yesterday
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}