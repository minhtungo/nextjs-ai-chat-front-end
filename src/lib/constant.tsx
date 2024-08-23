import Momo from "@/components/icons/Momo";
import { CreditCard } from "lucide-react";

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

export const PAYMENT_METHODS = [
  {
    title: "Card",
    icon: <CreditCard className="size-5" />,
    key: "card",
  },
  {
    title: "MoMo",
    icon: <Momo className="size-5" />,
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
