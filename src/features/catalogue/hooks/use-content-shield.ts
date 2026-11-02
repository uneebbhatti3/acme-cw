"use client";

import { useEffect, useState } from "react";

const SHIELD_AFTER_KEY_MS = 2500;

/**
 * Makes copying the open catalogue harder. A web page cannot truly block a
 * screenshot: the operating system takes it without asking the page. So this
 * hides the pages when the window loses focus (which most snipping tools cause)
 * and when a capture or print shortcut reaches the browser.
 */
export function useContentShield() {
  const [shielded, setShielded] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const hideFor = (ms: number) => {
      clearTimeout(timer);
      setShielded(true);
      timer = setTimeout(() => setShielded(!document.hasFocus()), ms);
    };
    const onBlur = () => {
      clearTimeout(timer);
      setShielded(true);
    };
    const onFocus = () => {
      clearTimeout(timer);
      setShielded(false);
    };
    const onVisibility = () => {
      if (document.hidden) onBlur();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const command = event.ctrlKey || event.metaKey;
      const blocked =
        (command && (key === "p" || key === "s")) || // Print and save
        (event.metaKey && event.shiftKey && ["3", "4", "5", "s"].includes(key)) || // macOS capture, Windows Snipping Tool
        (command && event.shiftKey && ["i", "c", "s"].includes(key)); // Developer tools, browser capture
      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
        hideFor(SHIELD_AFTER_KEY_MS);
      }
    };
    // Windows reports Print Screen only when the key is released, after the capture.
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key !== "PrintScreen") return;
      hideFor(SHIELD_AFTER_KEY_MS);
      navigator.clipboard?.writeText("").catch(() => {});
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keyup", onKeyUp, true);
    };
  }, []);

  return shielded;
}
