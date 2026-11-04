"use client";

import { animate } from "motion/mini";
import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { EASE_OUT, prefersReducedMotion } from "@/lib/use-in-view";

const OFFSET = 16;
const DURATION = 0.5;
const STEP = 0.06;
/** Never wait longer than this for the last item in a long batch. */
const MAX_STAGGER = 0.36;

function hide(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.transform = `translateY(${OFFSET}px)`;
}

function play(items: HTMLElement[], { delay = 0, offset = OFFSET, step = STEP } = {}) {
  items.forEach((el, i) => {
    animate(
      el,
      { opacity: [0, 1], transform: [`translateY(${offset}px)`, "translateY(0px)"] },
      { duration: DURATION, ease: EASE_OUT, delay: delay + Math.min(i * step, MAX_STAGGER) },
    ).then(() => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
    });
  });
}

const belowFold = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight;

/**
 * Shared scroll reveal (Motion, WAAPI): items fade up 16px, staggered 60ms,
 * once as they scroll into view. Everything is server-rendered visible; after
 * hydration only items that start below the fold are hidden, so first-screen
 * content is never held back. Reduced motion and no-JavaScript visitors see
 * the final state at once.
 *
 * The fold test reads the enclosing section first: bands use
 * `content-visibility: auto`, so their children have no real layout until the
 * band nears the viewport, but the band itself does.
 */
function useScrollReveal(ref: RefObject<HTMLElement | null>, targets: (root: HTMLElement) => HTMLElement[], delay = 0) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const items = targets(root);
    const section = root.closest("section") ?? root;
    const hidden = belowFold(section) ? items : items.filter(belowFold);
    if (!hidden.length) return;
    hidden.forEach(hide);

    const order = new Map(hidden.map((el, i) => [el, i]));
    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
        if (!entering.length) return;
        entering.forEach((el) => io.unobserve(el));
        play(entering, { delay });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    hidden.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      hidden.forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      });
    };
    // Runs once per mount; `targets` and `delay` are fixed for a given element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

type Tag = "div" | "li" | "ul" | "ol" | "dl" | "figure";

/** One element that fades up as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  ...rest
}: { children: ReactNode; delay?: number; as?: Tag } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, (root) => [root], delay);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * A list (or any container) whose direct children reveal one after another as
 * they scroll into view. Pass `replayKey` to replay a quick stagger on the
 * items on screen whenever it changes, e.g. after filtering. `select` targets
 * descendants instead of direct children (for grids whose cells draw the
 * borders, so only the content inside a cell should fade).
 */
export function Stagger({
  children,
  as: Tag = "ul",
  replayKey,
  select,
  ...rest
}: { children: ReactNode; as?: Tag; replayKey?: string; select?: string } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const items = (root: HTMLElement) => Array.from(select ? root.querySelectorAll(select) : root.children) as HTMLElement[];
  useScrollReveal(ref, items);

  const [lastKey, setLastKey] = useState(replayKey);
  const [replays, setReplays] = useState(0);
  if (replayKey !== lastKey) {
    setLastKey(replayKey);
    setReplays((n) => n + 1);
  }
  useEffect(() => {
    const root = ref.current;
    if (!replays || !root || prefersReducedMotion()) return;
    const onScreen = items(root).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    });
    play(onScreen, { offset: 8, step: 0.04 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replays]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} {...rest}>
      {children}
    </Tag>
  );
}
