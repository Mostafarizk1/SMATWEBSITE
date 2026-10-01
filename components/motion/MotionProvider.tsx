"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Wrap only the components that use `m.*` (not the whole app), so Motion's runtime is only
 * downloaded with the chunks that actually animate with it.
 * `strict` throws if anyone uses the full `motion.*` component instead of `m.*`.
 * reducedMotion="user" turns transform animations into plain fades for prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
