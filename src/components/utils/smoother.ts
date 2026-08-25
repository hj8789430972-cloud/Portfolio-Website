import { ScrollSmoother } from "gsap/ScrollSmoother";

let smootherInstance: ScrollSmoother | null = null;

export const setSmoother = (smoother: ScrollSmoother | null) => {
  smootherInstance = smoother;
};

export const getSmoother = (): ScrollSmoother | null => {
  return smootherInstance;
};

export const smoother = {
  get instance() {
    return smootherInstance;
  },
  paused(value?: boolean) {
    if (smootherInstance) {
      if (typeof value === "boolean") {
        return smootherInstance.paused(value);
      }
      return smootherInstance.paused();
    }
    return false;
  },
  scrollTo(target: string | number | Element, smooth?: boolean, position?: string) {
    if (smootherInstance) {
      smootherInstance.scrollTo(target, smooth, position);
    }
  },
  scrollTop(value?: number) {
    if (smootherInstance) {
      if (typeof value === "number") {
        return smootherInstance.scrollTop(value);
      }
      return smootherInstance.scrollTop();
    }
    return 0;
  },
};
