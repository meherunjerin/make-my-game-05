import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { Play, Pause, RotateCcw, ArrowRight, Check, X, Waves, Home } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type QuizAnswer = {
  question: string;
  options: { text: string; correct: boolean; icon: string }[];
  answered?: boolean;
  selectedCorrect?: boolean;
};

type Village = {
  id: number;
  x: number;
  y: number;
  isFlooded: boolean;
  found?: boolean;
};

const Level2 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"intro" | "video1" | "video2" | "video3" | "minigame" | "quiz" | "completion">("intro");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [villages, setVillages] = useState<Village[]>([
    { id: 1, x: 20, y: 30, isFlooded: true },
    { id: 2, x: 45, y: 20, isFlooded: false },
    { id: 3, x: 70, y: 35, isFlooded: true },
    { id: 4, x: 30, y: 60, isFlooded: false },
    { id: 5, x: 60, y: 70, isFlooded: true },
    { id: 6, x: 80, y: 60, isFlooded: false },
  ]);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([
    {
      question: "What causes floods?",
      options: [
        { text: "Too much rain", correct: true, icon: "☔" },
        { text: "Too much sun", correct: false, icon: "☀️" },
        { text: "No rivers", correct: false, icon: "🏜️" },
      ],
    },
    {
      question: "What happens when rivers overflow?",
      options: [
        { text: "Land stays dry", correct: false, icon: "🏖️" },
        { text: "Water spreads into land", correct: true, icon: "🌊" },
        { text: "Clouds disappear", correct: false, icon: "☁️" },
      ],
    },
    {
      question: "Are floods always safe?",
      options: [
        { text: "Yes", correct: false, icon: "😊" },
        { text: "No", correct: true, icon: "⚠️" },
      ],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleIntroComplete = () => {
    setStage("video1");
    setCurrentVideo(1);
    setVideoPlaying(false);
  };

  const handleVideo1End = () => {
    setStage("video2");
    setCurrentVideo(2);
    setVideoPlaying(false);
  };

  const handleVideo2End = () => {
    setStage("video3");
    setCurrentVideo(3);
    setVideoPlaying(false);
  };

  const handleVideo3End = () => {
    setStage("minigame");
  };

  const handleVillageClick = (villageId: number) => {
    const village = villages.find(v => v.id === villageId);
    if (!village || village.found) return;

    const newVillages = villages.map(v => {
      if (v.id === villageId) {
        if (v.isFlooded) {
          toast.success("Correct! That's flooded! ✨", {
            description: "You spotted a flooded village!",
          });
          return { ...v, found: true };
        } else {
          toast.error("Oops! That village is safe 💚", {
            description: "Try looking for the dark blue areas!",
          });
        }
      }
      return v;
    });
    
    setVillages(newVillages);

    // Check if all flooded villages are found
    if (newVillages.filter(v => v.isFlooded && v.found).length === newVillages.filter(v => v.isFlooded).length) {
      setTimeout(() => {
        toast.success("Amazing! You found all flooded areas! 🎉");
        setTimeout(() => setStage("quiz"), 1500);
      }, 500);
    }
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const isCorrect = quizAnswers[questionIndex].options[optionIndex].correct;
    
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex].answered = true;
    newAnswers[questionIndex].selectedCorrect = isCorrect;
    setQuizAnswers(newAnswers);

    if (isCorrect) {
      toast.success("Correct! 🌟", {
        description: "Great job! Keep going!",
      });
      
      setTimeout(() => {
        if (questionIndex < quizAnswers.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStage("completion");
        }
      }, 1500);
    } else {
      toast.error("Not quite! Try again 💡", {
        description: "Think about what you learned!",
      });
    }
  };

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-cyan/20 via-cosmic-blue/30 to-cosmic-purple/20 overflow-hidden relative">
      <StarField />
      
      {/* Orbiting Satellites */}
      <div className="absolute top-32 right-32 animate-orbit" style={{ animationDuration: "28s" }}>
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="relative">
            {/* Satellite body */}
            <div className="w-12 h-8 bg-gradient-to-br from-cosmic-cyan to-cosmic-blue rounded-sm border-2 border-cosmic-cyan shadow-lg" style={{ boxShadow: '0 0 20px hsl(190 80% 55%), 0 0 40px hsl(190 80% 55% / 0.5)' }} />
            {/* Solar panels */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-cosmic-blue to-cosmic-cyan/80 border-2 border-cosmic-cyan/50 shadow-lg" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-l from-cosmic-blue to-cosmic-cyan/80 border-2 border-cosmic-cyan/50 shadow-lg" />
            {/* Antenna */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-4 bg-cosmic-cyan shadow-lg" style={{ boxShadow: '0 0 10px hsl(190 80% 55%)' }} />
            {/* Dish */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-3 h-3 bg-cosmic-cyan/60 rounded-full border border-cosmic-cyan" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-24 animate-orbit" style={{ animationDuration: "32s", animationDelay: "-8s" }}>
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="relative">
            {/* Satellite body */}
            <div className="w-12 h-8 bg-gradient-to-br from-cosmic-blue to-cosmic-teal rounded-sm border-2 border-cosmic-blue shadow-lg" style={{ boxShadow: '0 0 20px hsl(200 90% 60%), 0 0 40px hsl(200 90% 60% / 0.5)' }} />
            {/* Solar panels */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-cosmic-teal to-cosmic-blue/80 border-2 border-cosmic-blue/50 shadow-lg" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-l from-cosmic-teal to-cosmic-blue/80 border-2 border-cosmic-blue/50 shadow-lg" />
            {/* Antenna */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-4 bg-cosmic-blue shadow-lg" style={{ boxShadow: '0 0 10px hsl(200 90% 60%)' }} />
            {/* Dish */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-3 h-3 bg-cosmic-blue/60 rounded-full border border-cosmic-blue" />
          </div>
        </div>
      </div>

      {/* Floating planets */}
      <div className="absolute top-40 left-40 w-20 h-20 bg-gradient-to-br from-cosmic-cyan/40 to-cosmic-blue/40 rounded-full blur-sm animate-float" style={{ animationDuration: "9s" }} />
      <div className="absolute bottom-40 right-40 w-28 h-28 bg-gradient-to-br from-cosmic-blue/30 to-cosmic-cyan/30 rounded-full blur-sm animate-float" style={{ animationDuration: "11s", animationDelay: "-3s" }} />
      <div className="absolute top-1/3 right-24 w-16 h-16 bg-gradient-to-br from-cosmic-teal/40 to-cosmic-cyan/40 rounded-full blur-sm animate-float" style={{ animationDuration: "8s", animationDelay: "-5s" }} />
      
      {/* Cosmic glow effects */}
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cosmic-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cosmic-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "-2s" }} />
      
      {/* Back to Home Button */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        size="icon"
        className="fixed top-6 left-6 z-50 border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20 backdrop-blur-md bg-background/80"
      >
        <Home className="w-5 h-5" />
      </Button>
      
      {/* Floating water droplets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cosmic-cyan/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Water ripple effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-cosmic-cyan/20 rounded-full animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 border-4 border-cosmic-blue/20 rounded-full animate-ping" style={{ animationDuration: "5s", animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 border-4 border-cosmic-cyan/20 rounded-full animate-ping" style={{ animationDuration: "4.5s", animationDelay: "2s" }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Intro Stage */}
        {stage === "intro" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-12 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_40px_hsl(190_80%_55%/0.4)] max-w-2xl text-center relative overflow-hidden">
              {/* Water ripple background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/10 to-cosmic-blue/10" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-block text-8xl mb-4">
                    <Waves className="w-24 h-24 text-cosmic-cyan animate-pulse" />
                  </div>
                </div>
                <h1 className="text-5xl font-bold mb-4 text-cosmic-cyan font-orbitron">
                  Level 2: Flood Expert
                </h1>
                <h2 className="text-3xl font-semibold mb-8 text-cosmic-blue">
                  Flood Explorer 🏆
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Learn why floods happen and how to spot them!
                </p>
                <Button
                  size="lg"
                  onClick={handleIntroComplete}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_30px_hsl(190_80%_55%/0.5)] hover:shadow-[0_0_50px_hsl(190_80%_55%/0.8)] transition-all"
                >
                  Start Learning <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Video 1 Stage */}
        {stage === "video1" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_40px_hsl(190_80%_55%/0.3)] max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-cosmic-cyan font-orbitron flex items-center gap-3">
                  <Waves className="w-8 h-8" />
                  What is a Flood?
                  <Waves className="w-8 h-8" />
                </h2>
                <span className="text-cosmic-cyan font-semibold">Video 1 of 3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-blue/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-cyan shadow-[0_0_30px_hsl(190_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌊</div>
                      <p className="text-xl text-foreground/80 mb-2 px-8">
                        Understanding floods
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setVideoPlaying(true)}
                        className="rounded-full w-20 h-20 bg-cosmic-cyan hover:bg-cosmic-cyan/80"
                      >
                        <Play className="w-10 h-10 fill-current" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8 space-y-6">
                      <div className="text-7xl animate-bounce">🌊</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in flex items-center gap-3 justify-center">
                          <span className="text-3xl">💧</span>
                          A flood is when water covers land that is usually dry
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "2s" }}>
                          <span className="text-3xl">🏞️</span>
                          It happens when there's too much water in rivers and streams
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "4s" }}>
                          <span className="text-3xl">🏘️</span>
                          Water then spreads into homes, streets, and fields
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Ripple effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-cosmic-cyan/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-4 border-cosmic-blue/20 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex gap-4 justify-center">
                {!videoPlaying ? (
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Play className="w-4 h-4 mr-2" /> Play
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVideoPlaying(false)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                )}
                <Button
                  onClick={() => setVideoPlaying(false)}
                  variant="outline"
                  className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Replay
                </Button>
                <Button
                  onClick={handleVideo1End}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold"
                >
                  Next Video <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Video 2 Stage */}
        {stage === "video2" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_40px_hsl(190_80%_55%/0.3)] max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-cosmic-cyan font-orbitron flex items-center gap-3">
                  <Waves className="w-8 h-8" />
                  Why Do Floods Happen in Bangladesh?
                  <Waves className="w-8 h-8" />
                </h2>
                <span className="text-cosmic-cyan font-semibold">Video 2 of 3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-blue/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-cyan shadow-[0_0_30px_hsl(190_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌧️</div>
                      <p className="text-xl text-foreground/80 mb-2 px-8">
                        Learn about floods in Bangladesh
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setVideoPlaying(true)}
                        className="rounded-full w-20 h-20 bg-cosmic-cyan hover:bg-cosmic-cyan/80"
                      >
                        <Play className="w-10 h-10 fill-current" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8 space-y-6">
                      <div className="text-7xl animate-bounce">☔</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in flex items-center gap-3 justify-center">
                          <span className="text-3xl">🌧️</span>
                          Bangladesh gets heavy monsoon rains every year
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "2s" }}>
                          <span className="text-3xl">🏔️</span>
                          Water flows down from mountains into big rivers
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "4s" }}>
                          <span className="text-3xl">🌊</span>
                          Rivers overflow and water spreads everywhere!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Ripple effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-cosmic-cyan/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-4 border-cosmic-blue/20 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex gap-4 justify-center">
                {!videoPlaying ? (
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Play className="w-4 h-4 mr-2" /> Play
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVideoPlaying(false)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                )}
                <Button
                  onClick={() => setVideoPlaying(false)}
                  variant="outline"
                  className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Replay
                </Button>
                <Button
                  onClick={handleVideo2End}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold"
                >
                  Next Video <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Video 3 Stage */}
        {stage === "video3" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_40px_hsl(190_80%_55%/0.3)] max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-cosmic-cyan font-orbitron flex items-center gap-3">
                  <Waves className="w-8 h-8" />
                  How Floods Affect People
                  <Waves className="w-8 h-8" />
                </h2>
                <span className="text-cosmic-cyan font-semibold">Video 3 of 3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-blue/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-cyan shadow-[0_0_30px_hsl(190_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏘️</div>
                      <p className="text-xl text-foreground/80 mb-2 px-8">
                        Understanding flood impacts
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setVideoPlaying(true)}
                        className="rounded-full w-20 h-20 bg-cosmic-cyan hover:bg-cosmic-cyan/80"
                      >
                        <Play className="w-10 h-10 fill-current" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8 space-y-6">
                      <div className="text-7xl animate-bounce">🏘️</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in flex items-center gap-3 justify-center">
                          <span className="text-3xl">🏠</span>
                          Floods can damage homes and schools
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "2s" }}>
                          <span className="text-3xl">🌾</span>
                          Crops and farms can be destroyed by flood water
                        </p>
                        <p className="animate-fade-in flex items-center gap-3 justify-center" style={{ animationDelay: "4s" }}>
                          <span className="text-3xl">🚨</span>
                          That's why we need to learn how to stay safe!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Ripple effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-cosmic-cyan/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-4 border-cosmic-blue/20 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex gap-4 justify-center">
                {!videoPlaying ? (
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Play className="w-4 h-4 mr-2" /> Play
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVideoPlaying(false)}
                    variant="outline"
                    className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                )}
                <Button
                  onClick={() => setVideoPlaying(false)}
                  variant="outline"
                  className="border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Replay
                </Button>
                <Button
                  onClick={handleVideo3End}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold"
                >
                  Play Mini-Game <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Mini-Game Stage */}
        {stage === "minigame" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-blue shadow-[0_0_40px_hsl(200_90%_60%/0.3)] max-w-4xl w-full">
              <h2 className="text-3xl font-bold mb-2 text-cosmic-blue text-center font-orbitron">
                🧩 Spot the Flood
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Tap on the flooded villages (dark blue areas)!
              </p>

              {/* Game Map */}
              <div className="relative aspect-video bg-gradient-to-br from-green-700/40 to-green-900/40 rounded-lg border-2 border-cosmic-blue mb-6 overflow-hidden">
                {/* River */}
                <div className="absolute top-1/2 left-0 right-0 h-16 bg-cosmic-blue/60 transform -translate-y-1/2 blur-sm" />
                <div className="absolute top-1/2 left-0 right-0 h-12 bg-cosmic-cyan/40 transform -translate-y-1/2" />

                {/* Villages */}
                {villages.map((village) => (
                  <button
                    key={village.id}
                    onClick={() => handleVillageClick(village.id)}
                    disabled={village.found}
                    className={cn(
                      "absolute w-16 h-16 rounded-lg transition-all transform hover:scale-110 cursor-pointer",
                      village.isFlooded
                        ? village.found
                          ? "bg-cosmic-cyan/60 border-4 border-cosmic-golden shadow-[0_0_20px_hsl(45_95%_60%/0.6)]"
                          : "bg-cosmic-blue/70 hover:shadow-[0_0_20px_hsl(200_90%_60%/0.5)]"
                        : village.found
                        ? "bg-green-500/60 border-4 border-green-600"
                        : "bg-green-600/70 hover:shadow-[0_0_15px_hsl(120_60%_50%/0.4)]",
                      "border-2 border-white/30"
                    )}
                    style={{
                      left: `${village.x}%`,
                      top: `${village.y}%`,
                    }}
                  >
                    <div className="text-2xl">
                      {village.found ? (
                        village.isFlooded ? "✨" : "💚"
                      ) : (
                        "🏘️"
                      )}
                    </div>
                  </button>
                ))}

                {/* Hint overlay */}
                {villages.filter(v => v.isFlooded && v.found).length === 0 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/80 px-6 py-3 rounded-full text-sm font-semibold animate-pulse">
                    💡 Look for dark blue areas near the river!
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="text-center">
                <p className="text-lg font-semibold text-cosmic-cyan">
                  Found: {villages.filter(v => v.isFlooded && v.found).length} / {villages.filter(v => v.isFlooded).length} flooded villages
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Quiz Stage */}
        {stage === "quiz" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-magenta shadow-[0_0_40px_hsl(320_60%_50%/0.3)] max-w-2xl w-full">
              <h2 className="text-3xl font-bold mb-2 text-cosmic-magenta text-center font-orbitron">
                Check What You Learned! 📝
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Question {currentQuestion + 1} of {quizAnswers.length}
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center text-foreground">
                  {quizAnswers[currentQuestion].question}
                </h3>

                <div className="grid gap-4">
                  {quizAnswers[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(currentQuestion, index)}
                      disabled={quizAnswers[currentQuestion].answered}
                      className={cn(
                        "h-auto py-6 text-xl font-semibold rounded-xl transition-all",
                        quizAnswers[currentQuestion].answered
                          ? option.correct
                            ? "bg-green-500 hover:bg-green-500 text-white shadow-[0_0_30px_hsl(120_60%_50%/0.5)]"
                            : "bg-muted hover:bg-muted text-muted-foreground"
                          : "bg-cosmic-magenta hover:bg-cosmic-magenta/80 text-white hover:shadow-[0_0_30px_hsl(320_60%_50%/0.5)]"
                      )}
                    >
                      <span className="text-3xl mr-4">{option.icon}</span>
                      {option.text}
                      {quizAnswers[currentQuestion].answered && option.correct && (
                        <Check className="ml-auto w-6 h-6" />
                      )}
                      {quizAnswers[currentQuestion].answered && !option.correct && (
                        <X className="ml-auto w-6 h-6" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-8 flex gap-2 justify-center">
                {quizAnswers.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      index < currentQuestion
                        ? "bg-green-500 shadow-[0_0_10px_hsl(120_60%_50%/0.5)]"
                        : index === currentQuestion
                        ? "bg-cosmic-magenta shadow-[0_0_10px_hsl(320_60%_50%/0.5)]"
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Completion Stage */}
        {stage === "completion" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-12 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_60px_hsl(190_80%_55%/0.5)] max-w-2xl text-center relative overflow-hidden">
              {/* Water ring animation background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-8 border-cosmic-cyan/30 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-8 border-cosmic-cyan/20 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
              </div>

              <div className="relative z-10">
                <div className="mb-8 relative">
                  <div className="inline-block text-9xl animate-bounce">🏅</div>
                  {/* Star burst animation */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute w-2 h-2 bg-cosmic-cyan rounded-full animate-ping" style={{ top: "-40px", left: "0" }} />
                    <div className="absolute w-2 h-2 bg-cosmic-blue rounded-full animate-ping" style={{ top: "-30px", left: "30px", animationDelay: "0.2s" }} />
                    <div className="absolute w-2 h-2 bg-cosmic-cyan rounded-full animate-ping" style={{ top: "0", left: "40px", animationDelay: "0.4s" }} />
                    <div className="absolute w-2 h-2 bg-cosmic-blue rounded-full animate-ping" style={{ top: "30px", left: "30px", animationDelay: "0.6s" }} />
                    <div className="absolute w-2 h-2 bg-cosmic-cyan rounded-full animate-ping" style={{ top: "40px", left: "0", animationDelay: "0.8s" }} />
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold mb-4 text-cosmic-cyan font-orbitron">
                  Congratulations! 🎉
                </h1>
                <h2 className="text-3xl font-semibold mb-4 text-cosmic-blue">
                  Badge Earned: Flood Explorer
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  You've learned about floods and earned your second badge! Planet 2 now glows with a cyan water-ring.
                </p>
                
                <div className="bg-cosmic-cyan/10 border-2 border-cosmic-cyan rounded-lg p-6 mb-8">
                  <p className="text-lg text-foreground">
                    🌊 You now understand why floods happen and how to spot them!
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleComplete}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_40px_hsl(190_80%_55%/0.6)] hover:shadow-[0_0_60px_hsl(190_80%_55%/0.9)] transition-all"
                >
                  Continue to Level 3: Safety Measures <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level2;
