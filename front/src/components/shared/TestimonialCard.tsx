import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  className?: string;
}

const TestimonialCard = ({ quote, name, role, company, className }: TestimonialCardProps) => {
  return (
    <div className={cn("card-premium p-6 md:p-8 flex flex-col h-full", className)}>
      <div className="icon-container-sm mb-4">
        <Quote className="w-4 h-4 text-primary" />
      </div>
      <p className="text-foreground text-base leading-relaxed flex-1 mb-6">
        "{quote}"
      </p>
      <div className="border-t border-border pt-4">
        <div className="font-semibold text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
        <div className="text-sm text-primary font-medium mt-1">{company}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
