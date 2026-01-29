import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  icon: LucideIcon;
  label: string;
  image: string;
  className?: string;
}

const FlipCard = ({ icon: Icon, label, image, className }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn("flip-card-container h-48 cursor-pointer", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "flip-card-inner relative w-full h-full transition-transform duration-500 preserve-3d",
        isFlipped && "rotate-y-180"
      )}>
        {/* Front */}
        <div className="flip-card-front absolute inset-0 backface-hidden">
          <div className="card-premium p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="icon-container mx-auto mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-foreground">{label}</span>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <img 
              src={image} 
              alt={label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
              <span className="text-white font-medium text-sm text-center">{label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;