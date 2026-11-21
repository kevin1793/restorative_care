import { useLayoutEffect } from "react";

// Gentle "rise and fade in" for page sections as they scroll into view.
//
// Only sections that start below the fold are hidden, so nothing visible on
// arrival ever flickers, and nothing is ever hidden for people who ask for
// reduced motion. The state lives in a data-reveal attribute ("pending" ->
// "shown") that React doesn't manage, styled in src/index.css. Runs in a
// layout effect so the hiding happens before the browser paints (no flash of
// visible-then-hidden content).
//
// A section is revealed once its top edge gets within the lower part of the
// screen, which also covers sections scrolled past in one jump (End key,
// dragging the scrollbar, a long anchor link) — an IntersectionObserver only
// reports crossings, so it would leave those hidden for good.
//
// Pass something that changes when the page changes (the pathname).
export default function useScrollReveal(pageKey) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    // The inner container of each section, not the section itself, so full-
    // width background colors stay put and only the content moves.
    const triggerLine = () => window.innerHeight * 0.92;
    const pending = [...document.querySelectorAll("main section > div")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    if (pending.length === 0) return undefined;

    pending.forEach((el) => el.setAttribute("data-reveal", "pending"));

    let remaining = pending.length;
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = triggerLine();
      pending.forEach((el) => {
        if (el.getAttribute("data-reveal") !== "pending") return;
        if (el.getBoundingClientRect().top < line) {
          el.setAttribute("data-reveal", "shown");
          remaining -= 1;
        }
      });
      if (remaining === 0) stop();
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    // Content above can change height after load (images, the map), moving a
    // section into view without any scrolling
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);
    if (resizeObserver) resizeObserver.observe(document.body);

    function stop() {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (resizeObserver) resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      stop();
      pending.forEach((el) => el.removeAttribute("data-reveal"));
    };
  }, [pageKey]);
}
