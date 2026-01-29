import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  variant?: "default" | "light" | "life";
  className?: string;
}

const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = true,
  variant = "default",
  className,
}: SectionHeaderProps) => {
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const subtitleColor = variant === "light" ? "text-white/80" : "text-muted-foreground";
  
  const getBadgeVariant = () => {
    if (variant === "light") return "muted";
    if (variant === "life") return "life";
    return "primary";
  };

  return (
    <div className={cn(centered && "text-center", "max-w-3xl", centered && "mx-auto", className)}>
      {badge && (
        <Badge variant={getBadgeVariant()} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold mb-4", textColor)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-base md:text-lg leading-relaxed", subtitleColor)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
