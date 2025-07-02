import { useState } from "react";
import { IdeaInput } from "@/components/IdeaInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { generateAIResult } from "@/services/aiService";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, Zap, RotateCcw } from "lucide-react";

interface AIResult {
  productName: string;
  brandOneLiner: string;
  productDirections: string[];
  domainSuggestions: string[];
  moodboard: string[];
}

const Index = () => {
  const [result, setResult] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalIdea, setOriginalIdea] = useState("");

  const handleIdeaSubmit = async (idea: string) => {
    setIsLoading(true);
    setOriginalIdea(idea);
    
    try {
      const aiResult = await generateAIResult(idea);
      setResult(aiResult);
    } catch (error) {
      console.error("Error generating AI result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIdea = () => {
    setResult(null);
    setOriginalIdea("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background cosmic effects */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-cosmic" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-cosmic" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse-cosmic" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">GalactAI</span>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">AI-Powered Idea Launcher</span>
          </div>
          
          {result && (
            <Button onClick={handleNewIdea} variant="outline" size="sm" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              New Idea
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {!result ? (
            /* Welcome State */
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="h-12 w-12 text-accent animate-pulse-cosmic" />
                  <h1 className="text-5xl md:text-6xl font-bold gradient-text">GalactAI</h1>
                </div>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                  Transform any idea into a complete product launch strategy
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground/80">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Product Name & Branding
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-secondary" />
                    Development Directions
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Domain Suggestions
                  </div>
                </div>
              </div>

              <IdeaInput onSubmit={handleIdeaSubmit} isLoading={isLoading} />

              {isLoading && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-muted-foreground">Launching your idea through the galaxy...</span>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results State */
            <div className="py-8 space-y-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground/80 mb-2">Original Idea:</p>
                <p className="text-lg italic text-muted-foreground bg-card/30 rounded-lg p-4 max-w-2xl mx-auto">
                  "{originalIdea}"
                </p>
              </div>
              
              <ResultsDisplay result={result} originalIdea={originalIdea} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground/60">
          Made with ✨ by GalactAI • Transform ideas into reality
        </div>
      </footer>
    </div>
  );
};

export default Index;