import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type ProjectVariant = "exp" | "life" | "upc" | "app";

interface ProjectCardProps {
  icon: LucideIcon;
  title: string;
  acronym: string;
  problem: string;
  solution: string;
  metric: string;
  href: string;
  variant?: ProjectVariant;
  className?: string;
}

const variantStyles: Record<ProjectVariant, {
  iconBg: string;
  iconColor: string;
  metricColor: string;
  buttonBg: string;
  buttonHover: string;
}> = {
  exp: {
    iconBg: "bg-project-exp-light",
    iconColor: "text-project-exp",
    metricColor: "text-project-exp",
    buttonBg: "bg-project-exp-muted hover:bg-project-exp-light",
    buttonHover: "hover:text-project-exp",
  },
  life: {
    iconBg: "bg-project-life-light",
    iconColor: "text-project-life",
    metricColor: "text-project-life",
    buttonBg: "bg-project-life-muted hover:bg-project-life-light",
    buttonHover: "hover:text-project-life",
  },
  upc: {
    iconBg: "bg-project-upc-light",
    iconColor: "text-project-upc",
    metricColor: "text-project-upc",
    buttonBg: "bg-project-upc-muted hover:bg-project-upc-light",
    buttonHover: "hover:text-project-upc",
  },
  app: {
    iconBg: "bg-project-app-light",
    iconColor: "text-project-app",
    metricColor: "text-project-app",
    buttonBg: "bg-project-app-muted hover:bg-project-app-light",
    buttonHover: "hover:text-project-app",
  },
};

const ProjectCard = ({
  icon: Icon,
  title,
  acronym,
  problem,
  solution,
  metric,
  href,
  variant = "exp",
  className,
}: ProjectCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div className={cn(
      "card-premium p-6 md:p-8 flex flex-col h-full group",
      className
    )}>
      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
          styles.iconBg
        )}>
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
        <div>
          <span className={cn("text-xs font-medium uppercase tracking-wider", styles.iconColor)}>
            {acronym}
          </span>
          <h3 className="text-lg font-semibold text-foreground mt-1">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Problema
          </span>
          <p className="text-sm text-foreground mt-1">{problem}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Solución
          </span>
          <p className="text-sm text-foreground mt-1">{solution}</p>
        </div>
      </div>

      {/* Metric */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className={cn("text-2xl font-bold mb-4", styles.metricColor)}>{metric}</div>
        <Button 
          variant="ghost" 
          className={cn("w-full justify-center", styles.buttonBg, styles.buttonHover)}
          asChild
        >
          <Link to={href}>Más información</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
