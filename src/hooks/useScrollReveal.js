import { useLayoutEffect } from "react";

// Rise-and-fade-in for page content as it scrolls into view.
//
// What animates:
//  - the inner container of each section (so full-width background colors
//    stay put and only the content moves), and
//  - for sections that hold cards or grid lists, each card on its own: the
//    section itself just fades and the cards rise one after another, as soon
//    as each nears the screen. Cards that appear in the same moment are
//    staggered (--reveal-i); ones far down the page animate when reached.
//
// Only things that start below the fold are hidden, so nothing visible on
// arrival flickers, and nothing is hidden at all for people who ask for
// reduced motion. State lives in a data-reveal attribute ("pending" ->
// "shown") that React doesn't manage; the look is in src/index.css. Runs in a
// layout effect so hiding happens before the browser paints.
//
// An element is revealed once its top edge gets within the lower part of the
// screen (a bit above the very bottom edge, so the motion is easy to notice). That also covers content scrolled past in one jump (End key,
// dragging the scrollbar, a long anchor link): an IntersectionObserver only
// reports crossings, so it would leave those hidden for good.
//
// Pass something that changes when the page changes (the pathname).
const ITEM_SELECTOR = "article, ul.grid > li, ol.grid > li";
const MAX_STAGGER = 6;

export default function useScrollReveal(pageKey) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const foldLine = window.innerHeight * 0.9;
    const targets = [];

    document.querySelectorAll("main section > div").forEach((container) => {
      const items = [...container.querySelectorAll(ITEM_SELECTOR)];
      if (items.length > 0) container.setAttribute("data-reveal-kind", "fade");
      targets.push(container, ...items);
    });

    const pending = targets.filter(
      (el) => el.getBoundingClientRect().top > foldLine
    );
    // Tidy up the marker on containers that stay visible
    targets.forEach((el) => {
      if (!pending.includes(el)) el.removeAttribute("data-reveal-kind");
    });
    if (pending.length === 0) return undefined;

    pending.forEach((el) => el.setAttribute("data-reveal", "pending"));

    let remaining = pending.length;
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.86;
      let order = 0;
      pending.forEach((el) => {
        if (el.getAttribute("data-reveal") !== "pending") return;
        const top = el.getBoundingClientRect().top;
        if (top < line) {
          // Stagger only what is actually on screen; anything scrolled past
          // in a jump (top < 0) just appears
          const onScreen = top >= 0;
          el.style.setProperty(
            "--reveal-i",
            onScreen ? Math.min(order, MAX_STAGGER) : 0
          );
          if (onScreen) order += 1;
          el.setAttribute("data-reveal", "shown");
          remaining -= 1;
        }
      });
      if (remaining === 0) stop();
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    // Content above can change height after load (images, the map), moving
    // something into view without any scrolling
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
      targets.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.removeAttribute("data-reveal-kind");
        el.style.removeProperty("--reveal-i");
      });
    };
  }, [pageKey]);
}
