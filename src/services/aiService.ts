// Mock AI service for demo purposes
// Replace with actual OpenAI API integration

interface AIResult {
  productName: string;
  brandOneLiner: string;
  productDirections: string[];
  domainSuggestions: string[];
  moodboard: string[];
}

const mockResults: Record<string, AIResult> = {
  "social media for book lovers": {
    productName: "BookVerse",
    brandOneLiner: "Where stories connect readers across the universe",
    productDirections: [
      "📱 Mobile App: Reading tracker with social features and book clubs",
      "🌐 SaaS Platform: Community management tools for book clubs and libraries", 
      "🔌 Browser Extension: Goodreads alternative with enhanced social features"
    ],
    domainSuggestions: [
      "bookverse.io",
      "readtogether.app", 
      "literaryloop.com"
    ],
    moodboard: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
    ]
  },
  default: {
    productName: "IdeaSpark",
    brandOneLiner: "Transforming thoughts into actionable products",
    productDirections: [
      "🌐 SaaS Platform: AI-powered idea validation and market research tool",
      "📱 Mobile App: Idea capture and development companion",
      "🔌 Slack Bot: Team ideation and brainstorming assistant"
    ],
    domainSuggestions: [
      "ideaspark.ai",
      "brainwave.tools",
      "conceptforge.io"
    ],
    moodboard: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop"
    ]
  }
};

export async function generateAIResult(idea: string): Promise<AIResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const lowerIdea = idea.toLowerCase();
  
  // Check for specific idea patterns
  for (const key in mockResults) {
    if (key !== 'default' && lowerIdea.includes(key)) {
      return mockResults[key];
    }
  }
  
  // Generate dynamic result based on idea
  const productName = generateProductName(idea);
  const brandOneLiner = generateBrandOneLiner(idea);
  
  return {
    productName,
    brandOneLiner,
    productDirections: [
      `🌐 SaaS Platform: ${idea} management and analytics dashboard`,
      `📱 Mobile App: On-the-go ${idea} companion with offline capabilities`,
      `🔌 API/Plugin: Integration tools for existing ${idea} workflows`
    ],
    domainSuggestions: [
      `${productName.toLowerCase().replace(/\s+/g, '')}.ai`,
      `${generateDomainVariant(productName)}.io`,
      `${generateDomainVariant(idea)}.app`
    ],
    moodboard: mockResults.default.moodboard
  };
}

function generateProductName(idea: string): string {
  const words = idea.split(' ').filter(w => w.length > 2);
  const primaryWord = words[0] || 'Idea';
  const suffixes = ['AI', 'Hub', 'Pro', 'Labs', 'Forge', 'Spark', 'Wave'];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return primaryWord.charAt(0).toUpperCase() + primaryWord.slice(1) + suffix;
}

function generateBrandOneLiner(idea: string): string {
  const templates = [
    `Revolutionizing ${idea} with intelligent automation`,
    `The smart way to manage and scale ${idea}`,
    `Empowering teams to excel at ${idea}`,
    `Making ${idea} accessible to everyone`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDomainVariant(text: string): string {
  return text.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 10);
}