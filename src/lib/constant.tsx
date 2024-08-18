import Momo from "@/components/icons/Momo";
import { BarChart, Bot, CreditCard, Group, RefreshCcw } from "lucide-react";

export const ONBOARDING_STEPS = [
  {
    label: "Academic",
    value: "academic",
  },
  {
    label: "Goals",
    value: "goals",
  },
  {
    label: "Finish",
    value: "finish",
  },
];

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const TOKEN_EXPIRATION_IN_MINUTES = 60;
export const MESSAGE_TOKEN_LIMIT = 10;
export const CHAT_TOKEN_LIMIT = 5000;

export const GOAlS = [
  {
    label: "Improve learning efficiency",
    value: "improve-learning-efficiency",
  },
  {
    label: "Enhance critical thinking skills",
    value: "enhance-critical-thinking-skills",
  },
  {
    label: "Develop problem-solving abilities",
    value: "develop-problem-solving-abilities",
  },
  {
    label: "Enhance memory retention",
    value: "enhance-memory-retention",
  },
  {
    label: "Foster creativity and innovation",
    value: "foster-creativity-and-innovation",
  },
  {
    label: "Strengthen analytical and logical thinking",
    value: "strengthen-analytical-and-logical-thinking",
  },
];

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

export const MESSAGES_LIMIT = 25;

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

export const ADMIN_EMAIL = "onboarding@resend.dev";

export const EXPIRY_PERIOD = 1800 * 1000;

export const PRICING_PLANS = [
  {
    title: "plan.free.title",
    value: "free",
    cta: "plan.free.cta",
    price: 0,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.free.features.1.title",
      },
      {
        title: "plan.free.features.2.title",
      },
    ],
  },
  {
    title: "plan.pro.title",
    value: "pro",
    cta: "plan.pro.cta",
    price: 10,
    isFeatured: true,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.pro.features.1.title",
      },
      {
        title: "plan.pro.features.2.title",
      },
    ],
  },
];

export type PricingPlan = (typeof PRICING_PLANS)[number];

export const SUBJECTS_BY_LEVEL = [
  {
    level: "Elementary",
    subjects: [
      { label: "Subject.Mathematics", value: "mathematics" },
      { label: "Subject.English", value: "english" },
      {
        label: "Subject.NaturalAndSocialSciences",
        value: "natural-and-social-sciences",
      },
    ],
  },
  {
    level: "Middle School",
    subjects: [
      { label: "Subject.Mathematics", value: "mathematics" },
      { label: "Subject.English", value: "english" },
      { label: "Subject.Biology", value: "biology" },
      { label: "Subject.Geography", value: "geography" },
      { label: "Subject.History", value: "history" },
    ],
  },
  {
    level: "High School",
    subjects: [
      { label: "Subject.VietnameseLiterature", value: "vietnamese-literature" },
      { label: "Subject.Mathematics", value: "mathematics" },
      { label: "Subject.English", value: "english" },
      { label: "Subject.Physics", value: "physics" },
      { label: "Subject.Chemistry", value: "chemistry" },
      { label: "Subject.Biology", value: "biology" },
      { label: "Subject.History", value: "history" },
      { label: "Subject.Geography", value: "geography" },
    ],
  },
];

export type SubjectByLevel = (typeof SUBJECTS_BY_LEVEL)[number];
export type TSubject = (typeof SUBJECTS)[number];

export const SUBJECTS = [
  {
    label: "Subject.Math",
    value: "math",
  },
  {
    label: "Subject.English",
    value: "english",
  },
  {
    label: "Subject.History",
    value: "history",
  },
  {
    label: "Subject.Science",
    value: "science",
  },
  {
    label: "Subject.Art",
    value: "art",
  },
];

export const ACADEMIC_LEVELS = [
  {
    label: "AcademicLevel.Elementary",
    value: "elementary",
  },
  {
    label: "AcademicLevel.Middle",
    value: "middle",
  },
  {
    label: "AcademicLevel.High",
    value: "high",
  },
  {
    label: "AcademicLevel.Uni",
    value: "uni",
  },
];

export const LANGUAGES = [
  {
    title: "Tiếng việt",
    locale: "vi",
  },
  {
    title: "English",
    locale: "en",
  },
];

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

export const PAYMENT_METHODS = [
  {
    title: "Card",
    icon: <CreditCard className="h-5 w-5" />,
    key: "card",
  },
  {
    title: "MoMo",
    icon: <Momo className="h-5 w-5" />,
    key: "momo",
  },
];

export const MONTH_NAMES = [
  {
    title: "Month.Jan",
    value: 1,
  },
  {
    title: "Month.Feb",
    value: 2,
  },
  {
    title: "Month.Mar",
    value: 3,
  },
  {
    title: "Month.Apr",
    value: 4,
  },
  {
    title: "Month.May",
    value: 5,
  },
  {
    title: "Month.Jun",
    value: 6,
  },
  {
    title: "Month.Jul",
    value: 7,
  },
  {
    title: "Month.Aug",
    value: 8,
  },
  {
    title: "Month.Sep",
    value: 9,
  },
  {
    title: "Month.Oct",
    value: 10,
  },
  {
    title: "Month.Nov",
    value: 11,
  },
  {
    title: "Month.Dec",
    value: 12,
  },
];
