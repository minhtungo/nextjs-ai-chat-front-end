import { BarChart, Bot, Group, RefreshCcw } from "lucide-react";

export const FEATURES = [
  {
    title: "Interactive AI Tutoring",
    description:
      "Experience personalized learning with our AI-powered tutoring system that adapts to your pace and style.",
    icon: <Bot className="size-4" />,
  },
  {
    title: "Dynamic Exercise Generator",
    description:
      "Benefit from an infinite pool of exercises generated dynamically to match your learning progress.",
    icon: <RefreshCcw className="size-4" />,
  },
  {
    title: "Real-Time Study Groups",
    description:
      "Join live study sessions with peers, share resources, and solve problems together in real-time.",
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
    
    Designed to foster critical thinking and problem-solving skills, our platform doesn't just give you answers—it leads you to them.
`,
    imageSrc: "/images/hero-dark.png",
    width: 1792,
    height: 1024,
    isOrderEven: false,
  },
  {
    title: "Personalized Learning Paths",
    description: `Tailor your study experience with customized content that aligns with your academic level and goals.
    
    Our AI tutor adapts to your pace and style, ensuring a seamless learning journey that maximizes your progress.
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
