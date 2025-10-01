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
  onPlay: () => void;
}

export const PlanetStation = ({ 
  title, 
  planetImage, 
  progress, 
  position,
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
        <div className={cn(
          "absolute inset-0 w-[300px] h-[300px] rounded-full blur-xl transition-opacity duration-500",
          "bg-primary/30",
          isHovered ? "opacity-100" : "opacity-50"
        )} />

        {/* Planet */}
        <div className={cn(
          "relative w-[300px] h-[300px] rounded-full overflow-hidden transition-transform duration-500 animate-float",
          isHovered && "scale-110"
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
            <Button size="lg" className="rounded-full w-16 h-16 animate-glow">
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
        <div className="max-w-md">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
};
