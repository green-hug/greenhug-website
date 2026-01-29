import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning" | "muted" | "life" | "upc";
  className?: string;
}

const Badge = ({ children, variant = "primary", className }: BadgeProps) => {
  const variants = {
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    muted: "bg-muted text-muted-foreground",
    life: "badge-life",
    upc: "badge-upc",
  };

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
