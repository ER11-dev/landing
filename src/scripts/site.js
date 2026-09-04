import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { findCurrentSection } from "./section-index";

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

let lenis;

const syncSmoothScroll = () => {
  lenis?.destroy();
  lenis = undefined;

  if (!motionPreference.matches) {
    lenis = new Lenis({
      anchors: true,
      autoRaf: true,
    });
  }
};

motionPreference.addEventListener("change", syncSmoothScroll);
syncSmoothScroll();

const hero = document.querySelector(".hero");
const heroProof = hero?.querySelector(".hero__art img");
let heroRegistrationTimer;
let heroRegistrationStarted = false;

const runHeroRegistration = () => {
  if (
    !hero ||
    heroRegistrationStarted ||
    motionPreference.matches ||
    document.hidden
  ) {
    return;
  }

  heroRegistrationStarted = true;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      hero.classList.add("is-registering");
      heroRegistrationTimer = window.setTimeout(
        () => hero.classList.remove("is-registering"),
        1260,
      );
    });
  });
};

const scheduleHeroRegistration = () => {
  if (heroProof?.complete) runHeroRegistration();
  else {
    heroProof?.addEventListener("load", runHeroRegistration, { once: true });
    heroProof?.addEventListener("error", runHeroRegistration, { once: true });
  }
};

window.addEventListener("load", scheduleHeroRegistration, { once: true });
if (document.readyState === "complete") scheduleHeroRegistration();

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) scheduleHeroRegistration();
});

motionPreference.addEventListener("change", () => {
  if (!motionPreference.matches) return;
  window.clearTimeout(heroRegistrationTimer);
  hero?.classList.remove("is-registering");
});

const heroCta = document.querySelector("[data-hero-cta]");
let stickyClone = null;
let stickyVisible = false;

const updateStickyCta = () => {
  if (!heroCta) return;

  const rect = heroCta.getBoundingClientRect();
  const pastCta = rect.bottom < 0;

  if (pastCta === stickyVisible) return;
  stickyVisible = pastCta;

  if (pastCta) {
    if (stickyClone) return;
    stickyClone = heroCta.cloneNode(true);
    stickyClone.removeAttribute("id");
    stickyClone.classList.add("hero__cta--sticky");
    stickyClone.removeAttribute("data-hero-cta");
    document.body.appendChild(stickyClone);
    requestAnimationFrame(() => {
      stickyClone?.classList.add("is-visible");
    });
  } else if (stickyClone) {
    stickyClone.remove();
    stickyClone = null;
  }
};

window.addEventListener("scroll", updateStickyCta, { passive: true });
updateStickyCta();

const indexLinks = [...document.querySelectorAll("[data-index-link]")];
const sections = [...document.querySelectorAll("[data-index-section]")];
const proofIndex = document.querySelector(".proof-index");
const mobileBar = document.querySelector(".mobile-bar");
const projectRail = document.querySelector(".project-rail");
const projectMobileBar = document.querySelector(".project-mobile-bar");
const progressSurfaces = [
  proofIndex,
  mobileBar,
  projectRail,
  projectMobileBar,
].filter(Boolean);
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

if (sections[0]) setCurrentSection(sections[0]);

let progressFrame;

const updatePageProgress = () => {
  progressFrame = undefined;
  const currentSection = findCurrentSection(sections, window.innerHeight);
  if (currentSection) setCurrentSection(currentSection);

  const scrollableDistance = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1,
  );
  const progress = Math.min(
    Math.max(window.scrollY / scrollableDistance, 0),
    1,
  );
  progressSurfaces.forEach((surface) =>
    surface.style.setProperty("--page-progress", String(progress)),
  );
};

const schedulePageProgress = () => {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updatePageProgress);
};

window.addEventListener("scroll", schedulePageProgress, { passive: true });
window.addEventListener("resize", schedulePageProgress);
window.addEventListener("load", schedulePageProgress, { once: true });
if ("ResizeObserver" in window) {
  new ResizeObserver(schedulePageProgress).observe(document.documentElement);
}
schedulePageProgress();

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

const sealGlitch = document.querySelector("[data-seal-glitch]");
let sealGlitchTimer;

const scheduleSealGlitch = () => {
  window.clearTimeout(sealGlitchTimer);
  if (!sealGlitch || motionPreference.matches || document.hidden) return;

  sealGlitchTimer = window.setTimeout(
    () => {
      sealGlitch.classList.add("is-glitching");
      window.setTimeout(() => {
        sealGlitch.classList.remove("is-glitching");
        scheduleSealGlitch();
      }, 760);
    },
    4200 + Math.random() * 4600,
  );
};

document.addEventListener("visibilitychange", scheduleSealGlitch);
motionPreference.addEventListener("change", scheduleSealGlitch);
scheduleSealGlitch();

const pressCheck = document.querySelector("[data-press-check]");
const pressCheckStatus = document.querySelector("[data-press-check-status]");
let pressCheckTimer;

const runPressCheck = () => {
  if (!hero || !pressCheck) return;

  window.clearTimeout(pressCheckTimer);
  hero.classList.remove("is-registering");
  void hero.offsetWidth;
  hero.classList.add("is-registering");
  pressCheck.classList.add("is-registered");

  if (pressCheckStatus) {
    pressCheckStatus.textContent = "Registered — 03 layers locked";
  }

  pressCheckTimer = window.setTimeout(() => {
    hero.classList.remove("is-registering");
  }, 1000);
};

pressCheck?.addEventListener("click", runPressCheck);

const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const stage = String(data.get("stage") ?? "").trim();

  if (contactStatus) {
    contactStatus.textContent = "Sending…";
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (!response.ok) {
      if (contactStatus) {
        contactStatus.textContent =
          result.error ?? "Something went wrong. Please try again.";
      }
      return;
    }

    window.posthog?.capture("contact_enquiry_composed", {
      product_stage: stage,
    });

    if (contactStatus) {
      contactStatus.textContent = "Message sent. We will be in touch shortly.";
    }

    contactForm.reset();
  } catch {
    if (contactStatus) {
      contactStatus.textContent =
        "Network error. Please try again or contact us via Telegram.";
    }
  }
});
