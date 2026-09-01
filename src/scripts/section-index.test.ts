import { describe, expect, test } from "bun:test";
import { findCurrentSection } from "./section-index";

const section = (id: string, top: number) => ({
  id,
  getBoundingClientRect: () => ({ top }),
});

describe("findCurrentSection", () => {
  test("selects the section occupying the viewport reading line", () => {
    const sections = [
      section("top", -7200),
      section("cases", -5100),
      section("readiness", -2900),
      section("offers", -1100),
      section("team", 250),
      section("stack", 1500),
    ];

    expect(findCurrentSection(sections, 1100)?.id).toBe("team");
  });

  test("keeps the first section current at the top of the page", () => {
    const sections = [section("top", 0), section("cases", 1200)];

    expect(findCurrentSection(sections, 900)?.id).toBe("top");
  });
});
