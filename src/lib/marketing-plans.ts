export interface MarketingPlan {
  name: string;
  description: string;
  monthly: number;
  annual: number;
  videos: string;
  channels: string;
  extras: string[];
}

export const marketingPlans: MarketingPlan[] = [
  {
    name: "Starter",
    description: "A steady start for your first channel.",
    monthly: 54,
    annual: 43,
    videos: "30 videos per month",
    channels: "1 automated channel",
    extras: ["Basic voice models"],
  },
  {
    name: "Growth Pro",
    description: "More room to scale your content operation.",
    monthly: 149,
    annual: 119,
    videos: "90 videos per month",
    channels: "3 channels",
    extras: ["Custom branding", "Advanced captions"],
  },
  {
    name: "Agency / White-Label",
    description: "A branded workflow for your client roster.",
    monthly: 499,
    annual: 399,
    videos: "10+ client workspaces",
    channels: "Custom domains",
    extras: ["White-label client reports"],
  },
];