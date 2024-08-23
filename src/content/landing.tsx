import { BarChart, Bot, Group, RefreshCcw } from "lucide-react";

export const FEATURES = [
  {
    title: "Interactive AI Tutoring",
    description:
      "Experience personalized learning with our AI-powered tutoring system that adapts to your pace and style.",
    icon: <Bot className="size-4" />,
  },
  {
    title: "Deep learning, no answers",
    description:
      "Unlike ChatGPT, Lumi never gives you the answer. It’s built to help you learn.",
    icon: <RefreshCcw className="size-4" />,
  },
  {
    title: "Real-Time Study",
    description: "Write and debate with guided prompts and immediate feedback.",
    icon: <Group className="size-4" />,
  },
  {
    title: "Progress Tracking",
    description:
      "Track your learning journey with detailed analytics on your progress and performance metrics.",
    icon: <BarChart className="size-4" />,
  },
];

export const INTRO_BLOCKS = [
  {
    title: "Empower Your Learning Journey with AI Tutor",
    description: `Unlock the full potential of your studies with our AI-powered tutor. Whether you're struggling with complex subjects or just need a guiding hand, our AI tutor is here to help. 
    
   Use advanced AI technology to provide personalized tutoring, helping you study effectively and achieve higher results.
`,
    imageSrc: "/images/hero-dark.png",
    width: 1792,
    height: 1024,
    isOrderEven: false,
  },
  {
    title: "Build your brain power",
    description: `Lumi challenges you to think critically and solve problems without giving you direct answers. Learn new skills anytime, whether it's algebra, SQL, or essay writing..
`,
    imageSrc: "/images/hero-dark.png",
    width: 1792,
    height: 1024,
    isOrderEven: true,
  },
];

export type TIntroBlock = (typeof INTRO_BLOCKS)[number];

export const FAQs = [
  {
    title: "What is AI?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
  {
    title: "What is AI Tutor?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
  {
    title: "How does AI Tutor work?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
  {
    title: "What are the benefits of using AI Tutor?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
  {
    title: "What levels and subjects can Lumi help with?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
  {
    title: "What sets Lumi apart from other AI learning tools?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!",
  },
];
