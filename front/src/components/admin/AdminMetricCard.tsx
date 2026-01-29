import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdminMetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  color?: string;
}

const AdminMetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  color = "primary"
}: AdminMetricCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-success/10 text-success";
      case "project-exp":
        return "bg-project-exp/10 text-project-exp";
      case "project-upc":
        return "bg-project-upc/10 text-project-upc";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-3 h-3" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-border/60 bg-card hover:border-border cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-muted-foreground/80 transition-colors">
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1.5 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">{change}</span>
              <span className="text-xs text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${getColorClasses(color)} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
          <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
      </div>
    </Card>
  );
};

export default AdminMetricCard;