"use client";

import { useState } from "react";

/** A bounded index (0 to count - 1) with step helpers, e.g. for zoom levels. */
export function useStepper(count: number) {
  const [index, setIndex] = useState(0);
  return {
    index,
    atStart: index === 0,
    atEnd: index === count - 1,
    next: () => setIndex((i) => Math.min(count - 1, i + 1)),
    prev: () => setIndex((i) => Math.max(0, i - 1)),
    reset: () => setIndex(0),
  };
}
