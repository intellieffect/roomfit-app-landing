"use client";

import { useInView, UseInViewOptions } from "framer-motion";
import { useRef, RefObject } from "react";

interface UseScrollAnimationOptions extends Omit<UseInViewOptions, "once"> {
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn {
  ref: RefObject<HTMLDivElement>;
  isInView: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { triggerOnce = true, margin = "-100px", ...rest } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin, ...rest });

  return { ref, isInView };
}
