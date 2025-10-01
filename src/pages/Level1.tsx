import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { Play, Pause, RotateCcw, ArrowRight, Check, X, Home } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type QuizAnswer = {
  question: string;
  options: { text: string; correct: boolean; icon: string }[];
  answered?: boolean;
  selectedCorrect?: boolean;
};

const Level1 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"intro" | "video1" | "video2" | "video3" | "quiz" | "completion">("intro");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([
    {
      question: "Can radar see through clouds?",
      options: [
        { text: "Yes", correct: true, icon: "✅" },
        { text: "No", correct: false, icon: "❌" },
      ],
    },
    {
      question: "What color is water in radar images?",
      options: [
        { text: "Dark", correct: true, icon: "🌊" },
        { text: "Bright", correct: false, icon: "🌞" },
      ],
    },
    {
      question: "Does radar work at night?",
      options: [
        { text: "Yes", correct: true, icon: "🌙" },
        { text: "No, only day", correct: false, icon: "☀️" },
      ],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleIntroComplete = () => {
    setStage("video1");
    setCurrentVideo(1);
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
    setStage("quiz");
    setVideoPlaying(false);
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
        description: "Think about what you learned in the video.",
      });
    }
  };

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-cosmic-purple to-cosmic-teal/20 overflow-hidden relative">
      <StarField />
      
      {/* Orbiting Satellites */}
      <div className="absolute top-20 right-20 z-0 animate-orbit" style={{ animationDuration: "25s" }}>
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="relative">
            {/* Satellite body */}
            <div className="w-12 h-8 bg-gradient-to-br from-cosmic-teal to-cosmic-cyan rounded-sm border-2 border-cosmic-teal shadow-lg" style={{ boxShadow: '0 0 20px hsl(180 65% 50%), 0 0 40px hsl(180 65% 50% / 0.5)' }} />
            {/* Solar panels */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-cosmic-teal to-cosmic-cyan/80 border-2 border-cosmic-teal/50 shadow-lg" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-l from-cosmic-teal to-cosmic-cyan/80 border-2 border-cosmic-teal/50 shadow-lg" />
            {/* Antenna */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-4 bg-cosmic-teal shadow-lg" style={{ boxShadow: '0 0 10px hsl(180 65% 50%)' }} />
            {/* Dish */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-3 h-3 bg-cosmic-teal/60 rounded-full border border-cosmic-teal" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 left-20 z-0 animate-orbit" style={{ animationDuration: "30s", animationDelay: "-5s" }}>
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

      {/* Floating planets */}
      <div className="absolute top-32 left-32 w-16 h-16 bg-gradient-to-br from-cosmic-teal/40 to-cosmic-cyan/40 rounded-full blur-sm animate-float" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-cosmic-magenta/30 to-cosmic-purple/30 rounded-full blur-sm animate-float" style={{ animationDuration: "10s", animationDelay: "-2s" }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-cosmic-cyan/40 to-cosmic-blue/40 rounded-full blur-sm animate-float" style={{ animationDuration: "7s", animationDelay: "-4s" }} />
      
      {/* Cosmic glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cosmic-teal/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "-2s" }} />
      
      {/* Back to Home Button */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        size="icon"
        className="fixed top-6 left-6 z-50 border-cosmic-teal text-cosmic-teal hover:bg-cosmic-teal/20 backdrop-blur-md bg-background/80"
      >
        <Home className="w-5 h-5" />
      </Button>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Intro Stage */}
        {stage === "intro" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-12 bg-card/80 backdrop-blur-md border-cosmic-teal shadow-[0_0_40px_hsl(180_65%_50%/0.3)] max-w-2xl text-center">
              <div className="mb-8">
                <div className="inline-block text-8xl mb-4 animate-pulse">🌐</div>
              </div>
              <h1 className="text-5xl font-bold mb-4 text-cosmic-teal font-orbitron">
                Level 1: Learn SAR
              </h1>
              <h2 className="text-3xl font-semibold mb-8 text-cosmic-cyan">
                Radar Explorer 🏆
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how radar technology helps us see floods from space!
              </p>
              <Button
                size="lg"
                onClick={handleIntroComplete}
                className="bg-cosmic-teal hover:bg-cosmic-teal/80 text-background font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_30px_hsl(180_65%_50%/0.5)] hover:shadow-[0_0_50px_hsl(180_65%_50%/0.8)] transition-all"
              >
                Start Learning <ArrowRight className="ml-2" />
              </Button>
            </Card>
          </div>
        )}

        {/* Video 1: Understanding SAR Technology */}
        {stage === "video1" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-teal shadow-[0_0_40px_hsl(180_65%_50%/0.3)] max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cosmic-teal font-orbitron">
                  🌐 Video 1: Understanding SAR Technology
                </h2>
                <span className="text-cosmic-cyan font-semibold">1/3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-purple to-cosmic-teal/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-cyan shadow-[0_0_30px_hsl(190_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🛰️</div>
                      <p className="text-xl text-foreground/80 mb-6 px-8">
                        "Discover what SAR technology is and how it works!"
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
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8">
                      <div className="text-8xl mb-6 animate-pulse">📡</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in">🛰️ SAR stands for Synthetic Aperture Radar</p>
                        <p className="animate-fade-in" style={{ animationDelay: "2s" }}>📡 It sends radio waves to Earth and measures the reflection</p>
                        <p className="animate-fade-in" style={{ animationDelay: "4s" }}>🌍 This creates detailed images of the Earth's surface</p>
                        <p className="animate-fade-in" style={{ animationDelay: "6s" }}>⚡ Works 24/7 regardless of weather conditions!</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Radar wave animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-cosmic-cyan/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-cosmic-cyan/20 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex gap-4 justify-center">
                {!videoPlaying ? (
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    variant="outline"
                    className="border-cosmic-teal text-cosmic-teal hover:bg-cosmic-teal/20"
                  >
                    <Play className="w-4 h-4 mr-2" /> Play
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVideoPlaying(false)}
                    variant="outline"
                    className="border-cosmic-teal text-cosmic-teal hover:bg-cosmic-teal/20"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                )}
                <Button
                  onClick={() => setVideoPlaying(false)}
                  variant="outline"
                  className="border-cosmic-teal text-cosmic-teal hover:bg-cosmic-teal/20"
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

        {/* Video 2: Seeing Through Clouds */}
        {stage === "video2" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-cyan shadow-[0_0_40px_hsl(190_80%_55%/0.3)] max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cosmic-cyan font-orbitron">
                  ☁️ Video 2: Seeing Through Clouds
                </h2>
                <span className="text-cosmic-teal font-semibold">2/3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-blue to-cosmic-cyan/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-teal shadow-[0_0_30px_hsl(180_65%_50%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">☁️</div>
                      <p className="text-xl text-foreground/80 mb-6 px-8">
                        "Learn how SAR can see through clouds and darkness!"
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setVideoPlaying(true)}
                        className="rounded-full w-20 h-20 bg-cosmic-teal hover:bg-cosmic-teal/80"
                      >
                        <Play className="w-10 h-10 fill-current" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8">
                      <div className="text-8xl mb-6 animate-pulse">🌤️</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in">☁️ Unlike cameras, SAR can see through clouds</p>
                        <p className="animate-fade-in" style={{ animationDelay: "2s" }}>🌙 It works perfectly at night without sunlight</p>
                        <p className="animate-fade-in" style={{ animationDelay: "4s" }}>🌧️ Rain and fog don't block radar signals</p>
                        <p className="animate-fade-in" style={{ animationDelay: "6s" }}>✨ This makes it perfect for monitoring floods!</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Cloud animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" />
                  <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
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
                  className="bg-cosmic-teal hover:bg-cosmic-teal/80 text-background font-bold"
                >
                  Next Video <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Video 3: Detecting Water */}
        {stage === "video3" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-blue shadow-[0_0_40px_hsl(210_80%_55%/0.3)] max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cosmic-blue font-orbitron">
                  🌊 Video 3: Detecting Water from Space
                </h2>
                <span className="text-cosmic-cyan font-semibold">3/3</span>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-teal to-cosmic-blue/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-blue shadow-[0_0_30px_hsl(210_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌊</div>
                      <p className="text-xl text-foreground/80 mb-6 px-8">
                        "Discover how radar identifies water and floods!"
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setVideoPlaying(true)}
                        className="rounded-full w-20 h-20 bg-cosmic-blue hover:bg-cosmic-blue/80"
                      >
                        <Play className="w-10 h-10 fill-current" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8">
                      <div className="text-8xl mb-6 animate-pulse">💧</div>
                      <div className="space-y-4 text-lg text-foreground/90 max-w-2xl">
                        <p className="animate-fade-in">🌊 Water appears dark in radar images</p>
                        <p className="animate-fade-in" style={{ animationDelay: "2s" }}>📊 Smooth surfaces reflect signals away from satellite</p>
                        <p className="animate-fade-in" style={{ animationDelay: "4s" }}>🏘️ Buildings and land appear brighter</p>
                        <p className="animate-fade-in" style={{ animationDelay: "6s" }}>🚨 This helps us spot floods quickly and save lives!</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Water wave animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cosmic-blue/20 to-transparent animate-pulse" />
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex gap-4 justify-center">
                {!videoPlaying ? (
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    variant="outline"
                    className="border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue/20"
                  >
                    <Play className="w-4 h-4 mr-2" /> Play
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVideoPlaying(false)}
                    variant="outline"
                    className="border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue/20"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                )}
                <Button
                  onClick={() => setVideoPlaying(false)}
                  variant="outline"
                  className="border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Replay
                </Button>
                <Button
                  onClick={handleVideo3End}
                  className="bg-cosmic-blue hover:bg-cosmic-blue/80 text-background font-bold"
                >
                  Take Quiz <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Quiz Stage */}
        {stage === "quiz" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-magenta shadow-[0_0_40px_hsl(320_60%_50%/0.3)] max-w-2xl w-full">
              <h2 className="text-3xl font-bold mb-2 text-cosmic-magenta text-center font-orbitron">
                Quick Quiz 📝
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
            <Card className="p-12 bg-card/90 backdrop-blur-md border-cosmic-golden shadow-[0_0_60px_hsl(45_95%_60%/0.5)] max-w-2xl text-center">
              <div className="mb-8 relative">
                <div className="inline-block text-9xl animate-bounce">🏅</div>
                {/* Star burst animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-2 h-2 bg-cosmic-golden rounded-full animate-ping" style={{ top: "-40px", left: "0" }} />
                  <div className="absolute w-2 h-2 bg-cosmic-cyan rounded-full animate-ping" style={{ top: "-30px", left: "30px", animationDelay: "0.2s" }} />
                  <div className="absolute w-2 h-2 bg-cosmic-magenta rounded-full animate-ping" style={{ top: "0", left: "40px", animationDelay: "0.4s" }} />
                  <div className="absolute w-2 h-2 bg-cosmic-golden rounded-full animate-ping" style={{ top: "30px", left: "30px", animationDelay: "0.6s" }} />
                  <div className="absolute w-2 h-2 bg-cosmic-cyan rounded-full animate-ping" style={{ top: "40px", left: "0", animationDelay: "0.8s" }} />
                </div>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 text-cosmic-golden font-orbitron">
                Congratulations! 🎉
              </h1>
              <h2 className="text-3xl font-semibold mb-4 text-cosmic-cyan">
                Badge Earned: Radar Explorer
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                You've mastered SAR technology and earned your first badge! Planet 1 is now complete with a golden ring.
              </p>
              
              <div className="bg-cosmic-golden/10 border-2 border-cosmic-golden rounded-lg p-6 mb-8">
                <p className="text-lg text-foreground">
                  ⭐ You can now see through clouds like a real radar expert!
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleComplete}
                className="bg-cosmic-golden hover:bg-cosmic-golden/80 text-background font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_40px_hsl(45_95%_60%/0.6)] hover:shadow-[0_0_60px_hsl(45_95%_60%/0.9)] transition-all"
              >
                Continue to Level 2: Flood Expert <ArrowRight className="ml-2" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1;
