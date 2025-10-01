import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlanetStation } from "@/components/PlanetStation";
import { StarField } from "@/components/StarField";
import { toast } from "sonner";
import planetTeal from "@/assets/planet-teal.png";
import planetCyan from "@/assets/planet-cyan.png";
import planetMagenta from "@/assets/planet-magenta.png";
import planetBlue from "@/assets/planet-blue.png";
import planetOrange from "@/assets/planet-orange.png";
import planetPink from "@/assets/planet-pink.png";
import planetTrophy from "@/assets/planet-trophy.png";

interface Level {
  id: number;
  title: string;
  planet: string;
  badge: string;
  glowColor: string;
  progress: number;
  isUnlocked?: boolean;
}

const Index = () => {
  const navigate = useNavigate();
  const [levels] = useState<Level[]>([
    { id: 1, title: "Level 1: Learn SAR", planet: planetTeal, badge: "Radar Explorer", glowColor: "hsl(180 65% 50%)", progress: 100 },
    { id: 2, title: "Level 2: Flood Expert", planet: planetCyan, badge: "Flood Explorer", glowColor: "hsl(190 80% 55%)", progress: 85 },
    { id: 3, title: "Level 3: Safety Measures", planet: planetMagenta, badge: "Safety Hero", glowColor: "hsl(320 60% 50%)", progress: 60 },
    { id: 4, title: "Level 4: Flood Forecast", planet: planetBlue, badge: "Future Planner", glowColor: "hsl(200 90% 60%)", progress: 40 },
    { id: 5, title: "Level 5: Flood Finder", planet: planetOrange, badge: "Flood Finder", glowColor: "hsl(25 95% 55%)", progress: 20 },
    { id: 6, title: "Level 6: Guidelines to Survive Flood", planet: planetPink, badge: "Protector", glowColor: "hsl(340 80% 65%)", progress: 0 },
    { id: 7, title: "Flood Guardian", planet: planetTrophy, badge: "Champion", glowColor: "hsl(45 95% 60%)", progress: 100, isUnlocked: true },
  ]);

  const handlePlay = (level: Level) => {
    if (level.id === 1) {
      navigate("/level/1");
    } else if (level.id === 2) {
      navigate("/level/2");
    } else {
      toast.success(`Starting ${level.title}!`, {
        description: `Unlock the ${level.badge} badge and save the day! 🌊`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-cosmic-purple to-background overflow-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-teal via-cosmic-cyan to-cosmic-blue bg-clip-text text-transparent animate-glow">
            🌊 Game 🌊
          </h1>
          <p className="text-xl text-muted-foreground">
            Journey through space and learn how to stay safe from floods!
          </p>
          <p className="text-lg text-cosmic-cyan mt-2">
            Complete each planet to earn your badges and become a Flood Guardian! 🏆
          </p>
        </header>

        <div className="relative space-y-8">
          {/* Path lines connecting planets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(180 65% 50%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(190 80% 55%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(190 80% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(320 60% 50%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="pathGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(320 60% 50%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(200 90% 60%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="pathGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(200 90% 60%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(25 95% 55%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="pathGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(25 95% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(340 80% 65%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="pathGradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(340 80% 65%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(45 95% 60%)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Path from Level 1 to Level 2 (left to right) */}
            <path d="M 15% 12% Q 50% 18%, 85% 24%" stroke="url(#pathGradient1)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
            
            {/* Path from Level 2 to Level 3 (right to left) */}
            <path d="M 85% 36% Q 50% 42%, 15% 48%" stroke="url(#pathGradient2)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
            
            {/* Path from Level 3 to Level 4 (left to right) */}
            <path d="M 15% 60% Q 50% 66%, 85% 72%" stroke="url(#pathGradient3)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
            
            {/* Path from Level 4 to Level 5 (right to left) */}
            <path d="M 85% 84% Q 50% 90%, 15% 96%" stroke="url(#pathGradient4)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
            
            {/* Path from Level 5 to Level 6 (left to right) */}
            <path d="M 15% 108% Q 50% 114%, 85% 120%" stroke="url(#pathGradient5)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: "1.2s" }} />
            
            {/* Path from Level 6 to Level 7 (right to center) */}
            <path d="M 85% 132% Q 65% 138%, 50% 144%" stroke="url(#pathGradient6)" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
          </svg>
          
          {levels.map((level, index) => (
            <PlanetStation
              key={level.id}
              title={level.title}
              planetImage={level.planet}
              badge={level.badge}
              glowColor={level.glowColor}
              progress={level.progress}
              isUnlocked={level.isUnlocked}
              position={index % 2 === 0 ? "left" : "right"}
              onPlay={() => handlePlay(level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
