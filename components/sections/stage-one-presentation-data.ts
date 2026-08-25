export type StageOneSlide = {
  index: number;
  src: string;
  alt: string;
};

export const stageOneSlides: StageOneSlide[] = Array.from({ length: 25 }, (_, index) => {
  const slideNumber = index + 1;

  return {
    index: slideNumber,
    src: `/assets/realization-stage-1/slides/slide-${String(slideNumber).padStart(2, "0")}.webp`,
    alt: `Slajd ${slideNumber} prezentacji I Fazy Inwestycji RapaNuiPark`
  };
});
