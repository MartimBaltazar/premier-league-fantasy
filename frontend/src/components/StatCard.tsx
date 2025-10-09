import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 bg-gradient-to-br from-card to-muted/20 border-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {value}
          </h3>
          {trend && (
            <p
              className={`text-sm mt-1 ${
                trend.isPositive ? "text-success" : "text-destructive"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </p>
          )}
        </div>
        <div className="p-4 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-glow">
          <Icon className="h-8 w-8 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
