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
