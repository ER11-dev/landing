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
  if (hasUsedPressControl || motionPreference.matches || autoRegistrationTimer) return;

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
const mobileBar = document.querySelector(".mobile-bar");
const sectionVisibility = new Map(sections.map((section) => [section, 0]));

const setCurrentSection = (section) => {
  const sectionIndex = sections.indexOf(section);

  indexLinks.forEach((link) => {
    const current = link.dataset.indexLink === section.id;
    link.classList.toggle("is-current", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  if (sectionIndex >= 0) {
    mobileBar?.style.setProperty("--section-progress", String((sectionIndex + 1) / sections.length));
  }
};

const indexObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    const visibleSection = sections
      .map((section) => ({ section, ratio: sectionVisibility.get(section) ?? 0 }))
      .filter(({ ratio }) => ratio > 0)
      .sort((a, b) => b.ratio - a.ratio)[0]?.section;

    if (visibleSection) setCurrentSection(visibleSection);
  },
  { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => indexObserver.observe(section));
