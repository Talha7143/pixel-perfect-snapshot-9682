import { describe, expect, it } from "vitest";

import { marketingPlans } from "@/lib/marketing-plans";

describe("marketing plan pricing", () => {
  it("keeps the published monthly and annual plan prices", () => {
    expect(marketingPlans.map(({ name, monthly, annual }) => ({ name, monthly, annual }))).toEqual([
      { name: "Starter", monthly: 54, annual: 43 },
      { name: "Growth Pro", monthly: 149, annual: 119 },
      { name: "Agency / White-Label", monthly: 499, annual: 399 },
    ]);
  });

  it("provides every field required by the pricing cards", () => {
    for (const plan of marketingPlans) {
      expect(plan.description.length).toBeGreaterThan(0);
      expect(plan.videos.length).toBeGreaterThan(0);
      expect(plan.channels.length).toBeGreaterThan(0);
      expect(plan.extras.length).toBeGreaterThan(0);
    }
  });
});