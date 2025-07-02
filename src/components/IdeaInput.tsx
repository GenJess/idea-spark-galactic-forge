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
        <Textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Type your idea or thought here... (e.g., 'A social media app for book lovers' or 'AI tool to organize photos')"
          className="min-h-[60px] max-h-[200px] resize-none bg-card/50 backdrop-blur-sm border-border stellar-glow transition-all duration-300 focus:stellar-glow text-lg placeholder:text-muted-foreground/70"
          disabled={isLoading}
        />
        
        {idea.trim() && (
          <div className="flex justify-center gap-3">
            <Button
              type="submit"
              variant="cosmic"
              disabled={isLoading}
              className="px-8 py-3 text-base"
            >
              {isLoading ? (
                <Sparkles className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Launch
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="stellar"
              disabled={isLoading}
              className="px-8 py-3 text-base"
              onClick={() => onSubmit(idea.trim())}
            >
              <Sparkles className="h-5 w-5" />
              Shipit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}