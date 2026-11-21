import { useLayoutEffect } from "react";

// Rise-and-fade-in for page content, in two phases.
//
// 1. LANDING. Everything on screen when the page opens (below the hero, which
//    builds itself in with the .hero-rise animations) cascades in top to
//    bottom, one piece after another: a waterfall. A visible section is
//    broken into its pieces (image, heading, paragraphs, cards...) so there
//    are several steps, not one block.
// 2. SCROLL. Anything below the fold waits, then rises into place as it nears
//    the screen. Sections below the fold animate as one unit; cards inside
//    them rise one after another. Content scrolled past in one jump (End key,
//    scrollbar, a long anchor link) is revealed too: an IntersectionObserver
//    only reports crossings and would leave it hidden for good.
//
// Nothing is hidden at all for people who ask for reduced motion. State lives
// in a data-reveal attribute ("pending" -> "shown") that React doesn't manage;
// the look is in src/index.css. The hiding runs in a layout effect, before the
// browser paints, so there is no flash of visible-then-hidden content.
//
// Pass something that changes when the page changes (the pathname).

// Cards, grid lists, and anything inside an element marked .reveal-blocks
// (used on the long text pages so each block rises on its own)
const ITEM_SELECTOR =
  "article, ul.grid > li, ol.grid > li, .reveal-blocks > *";
// Pieces that animate themselves on load (see .hero-* in src/index.css)
const HERO_SELECTOR = ".hero-rise, .hero-zoom, .hero-glow";
const MAX_STAGGER = 6;

// Landing waterfall timing (ms): starts once the hero's own sequence is under
// way, then one new piece every step
const LANDING_START_AFTER_HERO = 560;
const LANDING_START_NO_HERO = 100;
const LANDING_STEP = 130;
const MAX_LANDING_STEPS = 9;

const isOutOfFlow = (el) => {
  const position = window.getComputedStyle(el).position;
  return position === "absolute" || position === "fixed";
};

// The pieces of a section container that should animate on their own:
// its children, going one or two levels into plain wrapper divs. Skips the
// hero's own pieces, decorative/hidden absolutely-positioned elements, and
// cards (those are handled as items).
function piecesOf(root, depth = 0) {
  const pieces = [];
  [...root.children].forEach((child) => {
    if (child.matches(HERO_SELECTOR) || isOutOfFlow(child)) return;
    if (child.matches(ITEM_SELECTOR)) return;
    const hasHero = child.querySelector(HERO_SELECTOR) !== null;
    const hasItems = child.querySelector(ITEM_SELECTOR) !== null;
    const isWrapper =
      child.tagName === "DIV" && child.children.length > 1 && depth < 2;
    if (hasHero || hasItems || isWrapper) {
      pieces.push(...piecesOf(child, depth + 1));
    } else {
      pieces.push(child);
    }
  });
  return pieces;
}

export default function useScrollReveal(pageKey) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const foldLine = window.innerHeight * 0.9;
    const targets = [];

    document.querySelectorAll("main section > div").forEach((container) => {
      const items = [...container.querySelectorAll(ITEM_SELECTOR)];
      const startsBelowFold = container.getBoundingClientRect().top > foldLine;

      if (startsBelowFold) {
        // Not in view yet: the whole section rises as one when reached; if it
        // holds cards, the section only fades and the cards rise in turn
        if (items.length > 0) container.setAttribute("data-reveal-kind", "fade");
        targets.push(container, ...items);
      } else {
        // On screen (or straddling the fold): animate its pieces separately,
        // so the visible ones cascade now and the rest wait for the scroll
        targets.push(...piecesOf(container), ...items);
      }
    });

    // Document order, so the cascade runs top to bottom
    const ordered = [...new Set(targets)].sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );

    const pending = []; // below the fold: reveal on scroll
    const landing = []; // on screen now: the landing waterfall
    ordered.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > foldLine) pending.push(el);
      else if (rect.bottom > 0) landing.push(el);
    });

    // Tidy up the "fade" marker on anything that won't animate
    ordered.forEach((el) => {
      if (!pending.includes(el)) el.removeAttribute("data-reveal-kind");
    });

    if (pending.length === 0 && landing.length === 0) return undefined;

    [...landing, ...pending].forEach((el) =>
      el.setAttribute("data-reveal", "pending")
    );

    // --- Phase 1: landing waterfall -------------------------------------
    let landingFrame = 0;
    if (landing.length > 0) {
      const hasHero = document.querySelector(HERO_SELECTOR) !== null;
      const start = hasHero ? LANDING_START_AFTER_HERO : LANDING_START_NO_HERO;

      // Two frames, so the hidden state has been drawn before it changes
      landingFrame = window.requestAnimationFrame(() => {
        landingFrame = window.requestAnimationFrame(() => {
          landingFrame = 0;
          landing.forEach((el, i) => {
            const delay = start + Math.min(i, MAX_LANDING_STEPS) * LANDING_STEP;
            el.style.setProperty("--reveal-delay", `${delay}ms`);
            el.setAttribute("data-reveal", "shown");
          });
        });
      });
    }

    // --- Phase 2: reveal on scroll --------------------------------------
    let remaining = pending.length;
    let frame = 0;

    function stop() {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (resizeObserver) resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    }

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

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(check);
    }

    // Content above can change height after load (images, the map), moving
    // something into view without any scrolling
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);

    if (pending.length > 0) {
      if (resizeObserver) resizeObserver.observe(document.body);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }

    return () => {
      stop();
      if (landingFrame) window.cancelAnimationFrame(landingFrame);
      ordered.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.removeAttribute("data-reveal-kind");
        el.style.removeProperty("--reveal-i");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pageKey]);
}
