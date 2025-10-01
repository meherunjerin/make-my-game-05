import { useState } from "react";
import { Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlanetStationProps {
  title: string;
  planetImage: string;
  progress: number;
  position: "left" | "right";
  badge: string;
  glowColor: string;
  isUnlocked?: boolean;
  onPlay: () => void;
}

export const PlanetStation = ({ 
  title, 
  planetImage, 
  progress, 
  position,
  badge,
  glowColor,
  isUnlocked = false,
  onPlay 
}: PlanetStationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative flex items-center gap-8 py-20",
        position === "right" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Planet Container */}
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onPlay}
      >
        {/* Orbital rings */}
        <div className="absolute inset-0 w-[300px] h-[300px]">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-orbit" />
          <div className="absolute inset-4 border-2 border-secondary/20 rounded-full animate-orbit" style={{ animationDuration: "15s" }} />
        </div>

        {/* Glow effect */}
        <div 
          className={cn(
            "absolute inset-0 w-[300px] h-[300px] rounded-full blur-xl transition-all duration-500",
            isHovered ? "opacity-100 scale-110" : "opacity-60"
          )}
          style={{ 
            backgroundColor: glowColor,
            boxShadow: isUnlocked ? `0 0 80px ${glowColor}` : `0 0 40px ${glowColor}`
          }}
        />

        {/* Planet */}
        <div className={cn(
          "relative w-[300px] h-[300px] rounded-full overflow-hidden transition-all duration-500 animate-float",
          isHovered && "scale-110 animate-bounce"
        )}>
          <img 
            src={planetImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Play button overlay */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <Button 
              size="lg" 
              className="rounded-full w-16 h-16"
              style={{ 
                boxShadow: `0 0 30px ${glowColor}`,
                animation: isUnlocked ? 'glow 2s ease-in-out infinite' : 'none'
              }}
            >
              <Play className="w-8 h-8 fill-current" />
            </Button>
          </div>
        </div>

        {/* Orbiting moons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-accent rounded-full animate-orbit" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-orbit" style={{ animationDuration: "12s", animationDelay: "-3s" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2.5 h-2.5 bg-primary rounded-full animate-orbit" style={{ animationDuration: "18s", animationDelay: "-6s" }} />
        </div>
      </div>

      {/* Info Panel */}
      <div className={cn(
        "flex-1 space-y-4",
        position === "right" ? "text-right" : "text-left"
      )}>
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <div 
          className={cn(
            "inline-block px-6 py-2 rounded-full text-lg font-bold transition-all duration-300",
            "border-2"
          )}
          style={{ 
            borderColor: glowColor,
            color: glowColor,
            backgroundColor: `${glowColor}20`,
            boxShadow: isHovered ? `0 0 20px ${glowColor}` : 'none'
          }}
        >
          🏆 {badge}
        </div>
        <div className={cn(
          "max-w-md",
          position === "right" ? "ml-auto" : ""
        )}>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
};
