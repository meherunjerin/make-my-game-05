import { useState } from "react";
import { PlanetStation } from "@/components/PlanetStation";
import { StarField } from "@/components/StarField";
import { toast } from "sonner";
import planet1 from "@/assets/planet-1.png";
import planet2 from "@/assets/planet-2.png";
import planet3 from "@/assets/planet-3.png";
import planet4 from "@/assets/planet-4.png";

interface Level {
  id: number;
  title: string;
  planet: string;
  progress: number;
}

const Index = () => {
  const [levels] = useState<Level[]>([
    { id: 1, title: "1. Basic Concepts", planet: planet1, progress: 75 },
    { id: 2, title: "2. Fundamentals", planet: planet2, progress: 50 },
    { id: 3, title: "3. Code Playground", planet: planet3, progress: 25 },
    { id: 4, title: "4. Advanced Topics", planet: planet4, progress: 0 },
  ]);

  const handlePlay = (level: Level) => {
    toast.success(`Starting ${level.title}!`, {
      description: "Get ready to explore the cosmos of knowledge!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-cosmic-purple to-background overflow-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow">
            Cosmic Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground">
            Navigate through the universe of knowledge
          </p>
        </header>

        <div className="space-y-8">
          {levels.map((level, index) => (
            <PlanetStation
              key={level.id}
              title={level.title}
              planetImage={level.planet}
              progress={level.progress}
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
