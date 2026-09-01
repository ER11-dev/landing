interface IndexedSection {
  getBoundingClientRect(): { top: number };
}

const READING_LINE_RATIO = 0.35;

export const findCurrentSection = <Section extends IndexedSection>(
  sections: Section[],
  viewportHeight: number,
) => {
  if (sections.length === 0) return undefined;

  const readingLine = viewportHeight * READING_LINE_RATIO;

  return sections.reduce(
    (current, section) =>
      section.getBoundingClientRect().top <= readingLine ? section : current,
    sections[0],
  );
};
