const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const stage = String(data.get("stage") ?? "").trim();
  const brief = String(data.get("brief") ?? "").trim();
  const address = contactForm.dataset.contactAddress;

  if (!address) {
    if (contactStatus) {
      contactStatus.textContent =
        "The contact address is unavailable. Please use Telegram instead.";
    }
    return;
  }

  const subject = encodeURIComponent(`ER11 enquiry from ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Product stage: ${stage}`,
      "",
      brief,
    ].join("\n"),
  );

  if (contactStatus) {
    contactStatus.textContent = "Opening your email application…";
  }

  window.location.href = `mailto:${address}?subject=${subject}&body=${body}`;
});
