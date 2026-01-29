import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon?: LucideIcon;
  value: string;
  label: string;
  variant?: "default" | "light" | "dark";
  className?: string;
}

const MetricCard = ({ icon: Icon, value, label, variant = "default", className }: MetricCardProps) => {
  const variants = {
    default: "card-metric bg-card",
    light: "card-metric bg-white/10 border-white/20",
    dark: "card-metric bg-charcoal border-charcoal",
  };

  const textVariants = {
    default: {
      value: "text-foreground",
      label: "text-muted-foreground",
      icon: "bg-accent text-primary",
    },
    light: {
      value: "text-white",
      label: "text-white/70",
      icon: "bg-white/20 text-white",
    },
    dark: {
      value: "text-white",
      label: "text-white/70",
      icon: "bg-primary/20 text-primary",
    },
  };

  return (
    <div className={cn(variants[variant], "text-center", className)}>
      {Icon && (
        <div className={cn("icon-container mx-auto mb-4", textVariants[variant].icon)}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className={cn("text-3xl md:text-4xl font-bold mb-2", textVariants[variant].value)}>
        {value}
      </div>
      <div className={cn("text-sm", textVariants[variant].label)}>
        {label}
      </div>
    </div>
  );
};

export default MetricCard;
