import Momo from "@/components/icons/Momo";
import { CreditCard } from "lucide-react";

export const EXPIRY_PERIOD = 1800 * 1000;

export const PRICING_PLANS = [
  {
    title: "plan.free.title",
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
      {
        title: "plan.free.features.3.title",
      },
    ],
  },
  {
    title: "plan.pro.title",
    cta: "plan.pro.cta",
    price: 10,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.pro.features.1.title",
      },
      {
        title: "plan.pro.features.2.title",
      },
      {
        title: "plan.pro.features.3.title",
      },
    ],
  },
  {
    title: "plan.premium.title",
    cta: "plan.premium.cta",
    price: 100,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.premium.features.1.title",
      },
      {
        title: "plan.premium.features.2.title",
      },
      {
        title: "plan.premium.features.3.title",
      },
    ],
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
