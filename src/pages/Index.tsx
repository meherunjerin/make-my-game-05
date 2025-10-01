import { useState } from "react";
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
    toast.success(`Starting ${level.title}!`, {
      description: `Unlock the ${level.badge} badge and save the day! 🌊`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-cosmic-purple to-background overflow-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-teal via-cosmic-cyan to-cosmic-blue bg-clip-text text-transparent animate-glow">
            🌊 Flood Adventure 🌊
          </h1>
          <p className="text-xl text-muted-foreground">
            Journey through space and learn how to stay safe from floods!
          </p>
          <p className="text-lg text-cosmic-cyan mt-2">
            Complete each planet to earn your badges and become a Flood Guardian! 🏆
          </p>
        </header>

        <div className="space-y-8">
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
