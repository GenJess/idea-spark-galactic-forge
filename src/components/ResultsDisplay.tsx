import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Twitter, ExternalLink, Zap, Layers, Globe, Palette } from "lucide-react";

interface AIResult {
  productName: string;
  brandOneLiner: string;
  productDirections: string[];
  domainSuggestions: string[];
  moodboard: string[];
}

interface ResultsDisplayProps {
  result: AIResult;
  originalIdea: string;
}

export function ResultsDisplay({ result, originalIdea }: ResultsDisplayProps) {
  const handleTwitterShare = () => {
    const text = `🚀 Just launched "${result.productName}" with GalactAI!\n\n"${result.brandOneLiner}"\n\nBuilt from the idea: "${originalIdea}"\n\n#GalactAI #AI #ProductLaunch`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://galactai.me')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold gradient-text">{result.productName}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{result.brandOneLiner}</p>
        <Button onClick={handleTwitterShare} variant="stellar" size="sm" className="gap-2">
          <Twitter className="h-4 w-4" />
          Share Launch
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Directions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-secondary" />
              Product Directions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.productDirections.map((direction, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <Badge variant="outline" className="shrink-0 mt-0.5">
                  {index + 1}
                </Badge>
                <span className="text-sm">{direction}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Domain Suggestions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              Domain Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.domainSuggestions.map((domain, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <span className="font-mono text-sm">{domain}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://${domain}`, '_blank')}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Moodboard */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Visual Moodboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.moodboard.map((imageUrl, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-gradient-cosmic opacity-80 hover:opacity-100 transition-opacity cursor-pointer stellar-glow"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}