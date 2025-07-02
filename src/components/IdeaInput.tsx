import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send } from "lucide-react";

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export function IdeaInput({ onSubmit, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Type your idea or thought here... (e.g., 'A social media app for book lovers' or 'AI tool to organize photos')"
            className="min-h-[60px] max-h-[200px] resize-none bg-card/50 backdrop-blur-sm border-border stellar-glow transition-all duration-300 focus:stellar-glow text-lg placeholder:text-muted-foreground/70"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {idea.trim() && (
              <Button
                type="submit"
                variant="cosmic"
                size="sm"
                disabled={isLoading}
                className="h-8 px-3"
              >
                {isLoading ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Launch
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}