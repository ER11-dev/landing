import Lenis from "lenis";
import "lenis/dist/lenis.css";

const proofStage = document.querySelector("[data-proof-stage]");
const registerButton = document.querySelector("[data-register]");
const proofStatus = document.querySelector("[data-proof-status]");
const hero = proofStage?.closest(".hero");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

let autoRegistrationTimer;
let registrationCleanupTimer;
let proofObserver;
let hasUsedPressControl = false;

const stopAutoRegistration = () => {
  window.clearTimeout(autoRegistrationTimer);
  proofObserver?.disconnect();
};

const clearRegistrationMotion = () => {
  window.clearTimeout(registrationCleanupTimer);
  hero?.classList.remove("is-registering", "is-separating");
};

const setRegistration = (registered) => {
  if (!proofStage || !registerButton || !proofStatus) return;

  clearRegistrationMotion();
  proofStage.classList.toggle("is-registered", registered);
  registerButton.setAttribute("aria-pressed", String(registered));
  registerButton.querySelector("span").textContent = registered
    ? "Separate proof layers"
    : "Run press check";
  proofStatus.textContent = registered
    ? "Three ownership layers registered into one product proof."
    : "Layers separated for inspection.";

  if (motionPreference.matches) return;

  hero?.classList.add(registered ? "is-registering" : "is-separating");
  registrationCleanupTimer = window.setTimeout(clearRegistrationMotion, 1050);
};

registerButton?.addEventListener("click", () => {
  hasUsedPressControl = true;
  stopAutoRegistration();
  proofStatus?.setAttribute("aria-live", "polite");
  setRegistration(!proofStage.classList.contains("is-registered"));
});

const scheduleAutoRegistration = () => {
  if (hasUsedPressControl || motionPreference.matches || autoRegistrationTimer)
    return;

  autoRegistrationTimer = window.setTimeout(() => {
    autoRegistrationTimer = undefined;
    setRegistration(true);
  }, 240);
};

if (motionPreference.matches) {
  setRegistration(true);
} else if (proofStage && "IntersectionObserver" in window) {
  proofObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting || entry.intersectionRatio < 0.35) return;

      proofObserver?.disconnect();
      scheduleAutoRegistration();
    },
    { threshold: [0.35] },
  );
  proofObserver.observe(proofStage);
} else {
  scheduleAutoRegistration();
}

motionPreference.addEventListener("change", ({ matches }) => {
  if (!matches) return;

  stopAutoRegistration();
  clearRegistrationMotion();
  setRegistration(true);
});

const indexLinks = [...document.querySelectorAll("[data-index-link]")];
const sections = [...document.querySelectorAll("[data-index-section]")];
const proofIndex = document.querySelector(".proof-index");
const mobileBar = document.querySelector(".mobile-bar");
const sectionVisibility = new Map(sections.map((section) => [section, 0]));

const setCurrentSection = (section) => {
  indexLinks.forEach((link) => {
    const current = link.dataset.indexLink === section.id;
    link.classList.toggle("is-current", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  sections.forEach((candidate) =>
    candidate.classList.toggle("is-section-current", candidate === section),
  );
  section.classList.add("has-entered");
};

const indexObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(
        entry.target,
        entry.isIntersecting ? entry.intersectionRatio : 0,
      );
    });

    const visibleSection = sections
      .map((section) => ({
        section,
        ratio: sectionVisibility.get(section) ?? 0,
      }))
      .filter(({ ratio }) => ratio > 0)
      .sort((a, b) => b.ratio - a.ratio)[0]?.section;

    if (visibleSection) setCurrentSection(visibleSection);
  },
  { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => indexObserver.observe(section));

if (sections[0]) setCurrentSection(sections[0]);

let progressFrame;

const updatePageProgress = () => {
  progressFrame = undefined;
  const scrollableDistance = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1,
  );
  const progress = Math.min(
    Math.max(window.scrollY / scrollableDistance, 0),
    1,
  );
  proofIndex?.style.setProperty("--page-progress", String(progress));
  mobileBar?.style.setProperty("--page-progress", String(progress));
};

const schedulePageProgress = () => {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updatePageProgress);
};

const desktopWheelInput = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
);
let smoothScroll;

const setUpSmoothScroll = () => {
  smoothScroll?.destroy();
  smoothScroll = undefined;
  document.documentElement.removeAttribute("data-scroll-engine");

  if (motionPreference.matches || !desktopWheelInput.matches) return;

  smoothScroll = new Lenis({
    anchors: true,
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
  });
  smoothScroll.on("scroll", schedulePageProgress);
  document.documentElement.dataset.scrollEngine = "lenis";
};

window.addEventListener("scroll", schedulePageProgress, { passive: true });
window.addEventListener("resize", schedulePageProgress);
window.addEventListener("load", schedulePageProgress, { once: true });
if ("ResizeObserver" in window) {
  new ResizeObserver(schedulePageProgress).observe(document.documentElement);
}
schedulePageProgress();

desktopWheelInput.addEventListener("change", setUpSmoothScroll);
motionPreference.addEventListener("change", setUpSmoothScroll);
setUpSmoothScroll();

const roleBands = [...document.querySelectorAll("[data-role-band]")];
const mobileRoleMotion = window.matchMedia(
  "(max-width: 760px), (hover: none), (pointer: coarse)",
);
let roleBandObserver;

const setUpRoleBandMotion = () => {
  roleBandObserver?.disconnect();
  roleBandObserver = undefined;

  if (
    motionPreference.matches ||
    !mobileRoleMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    roleBands.forEach((band) => band.classList.remove("is-scroll-registered"));
    return;
  }

  roleBandObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        entry.target.classList.add("is-scroll-registered");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "-58px 0px -18%", threshold: [0.5] },
  );

  roleBands.forEach((band) => roleBandObserver.observe(band));
};

mobileRoleMotion.addEventListener("change", setUpRoleBandMotion);
motionPreference.addEventListener("change", setUpRoleBandMotion);
setUpRoleBandMotion();
