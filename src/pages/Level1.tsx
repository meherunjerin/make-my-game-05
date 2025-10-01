import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { Play, Pause, RotateCcw, ArrowRight, Check, X } from "lucide-react";
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
  const [stage, setStage] = useState<"intro" | "video" | "quiz" | "completion">("intro");
  const [videoPlaying, setVideoPlaying] = useState(false);
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
    setStage("video");
  };

  const handleVideoEnd = () => {
    setStage("quiz");
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
    <div className="min-h-screen bg-gradient-to-b from-background via-cosmic-purple to-background overflow-hidden relative">
      <StarField />
      
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

        {/* Video Stage */}
        {stage === "video" && (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <Card className="p-8 bg-card/90 backdrop-blur-md border-cosmic-teal shadow-[0_0_40px_hsl(180_65%_50%/0.3)] max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-cosmic-teal text-center font-orbitron">
                🌐 Understanding SAR Technology
              </h2>
              
              {/* Video Player Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-cosmic-purple to-cosmic-teal/20 rounded-lg mb-6 overflow-hidden border-2 border-cosmic-cyan shadow-[0_0_30px_hsl(190_80%_55%/0.4)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🛰️</div>
                      <p className="text-xl text-foreground/80 mb-6 px-8">
                        "Radar sees through clouds and shows us floods, even at night!"
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
                        <p className="animate-fade-in" style={{ animationDelay: "2s" }}>☁️ It can see through clouds and darkness</p>
                        <p className="animate-fade-in" style={{ animationDelay: "4s" }}>🌊 Water appears dark in radar images</p>
                        <p className="animate-fade-in" style={{ animationDelay: "6s" }}>🌙 Works day and night to keep us safe!</p>
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
                  onClick={handleVideoEnd}
                  className="bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-background font-bold"
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
