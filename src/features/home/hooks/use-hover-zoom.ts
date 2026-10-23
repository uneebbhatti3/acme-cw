"use client";

import { useState, type PointerEvent } from "react";

/**
 * Magnifies an element under a mouse pointer (touch and pen are ignored).
 * Spread `handlers` on the frame and `style` on the content.
 */
export function useHoverZoom(scale = 2) {
  const [hover, setHover] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handlers = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => setHover(e.pointerType === "mouse"),
    onPointerLeave: () => setHover(false),
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    },
  };

  const style = {
    transform: hover ? `scale(${scale})` : "scale(1)",
    transformOrigin: `${origin.x}% ${origin.y}%`,
    transition: "transform .25s ease-out",
  };

  return { handlers, style };
}
