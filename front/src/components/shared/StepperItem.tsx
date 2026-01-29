import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepperItemProps {
  number: number;
  title: string;
  description: string;
  bullets: string[];
  icon?: LucideIcon;
  isLast?: boolean;
  variant?: "default" | "life" | "upc";
  className?: string;
}

const StepperItem = ({
  number,
  title,
  description,
  bullets,
  icon: Icon,
  isLast = false,
  variant = "default",
  className,
}: StepperItemProps) => {
  const getStyles = () => {
    switch (variant) {
      case "life":
        return {
          circle: "bg-project-life text-white",
          line: "bg-gradient-to-b from-project-life to-project-life-light",
          bullet: "bg-project-life",
        };
      case "upc":
        return {
          circle: "bg-project-upc text-white",
          line: "bg-gradient-to-b from-project-upc/40 to-project-upc-light",
          bullet: "bg-project-upc",
        };
      default:
        return {
          circle: "bg-primary text-primary-foreground",
          line: "bg-gradient-to-b from-primary to-accent",
          bullet: "bg-primary",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={cn("relative flex gap-6", className)}>
      {/* Number/Icon Circle */}
      <div className="relative flex flex-col items-center">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg z-10", styles.circle)}>
          {Icon ? <Icon className="w-5 h-5" /> : number}
        </div>
        {!isLast && (
          <div className={cn("w-0.5 flex-1 mt-4", styles.line)} />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-12", isLast && "pb-0")}>
        <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <span className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", styles.bullet)} />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepperItem;
