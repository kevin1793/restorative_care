import React, { useEffect, useRef, useState, useCallback } from "react";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";

// Visitor-controlled display preferences: text size, high contrast and
// always-underlined links. Preferences are saved in localStorage and applied
// by an inline script in public/index.html before React loads (so there is no
// flash of the default size), and again here whenever they change.
//
// Text size works by changing the root font size: every Tailwind size on the
// site is rem-based, so the whole layout scales together. 18px is the site's
// normal base size (report §3.15).
export const STORAGE_KEY = "rc-a11y-prefs";
const TEXT_SIZES = [18, 20, 22, 24]; // px; index 0 is the default
const SIZE_LABELS = ["Default", "Large", "Larger", "Largest"];
const DEFAULT_PREFS = { size: 0, contrast: false, links: false };

function readPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      const size = Number.isInteger(saved.size)
        ? Math.min(Math.max(saved.size, 0), TEXT_SIZES.length - 1)
        : 0;
      return { size, contrast: !!saved.contrast, links: !!saved.links };
    }
  } catch (e) {
    /* storage unavailable or corrupt — fall back to defaults */
  }
  return DEFAULT_PREFS;
}

function applyPrefs({ size, contrast, links }) {
  const root = document.documentElement;
  if (size === 0) {
    root.style.removeProperty("font-size");
  } else {
    root.style.fontSize = `${TEXT_SIZES[size]}px`;
  }
  root.classList.toggle("a11y-contrast", contrast);
  root.classList.toggle("a11y-links", links);
}

function Switch({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="w-full flex items-center justify-between gap-4 min-h-[48px] rounded-xl border border-gray-300 bg-white px-4 py-2 text-left hover:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span>
        <span className="block font-medium text-gray-900">{label}</span>
        <span className="block text-sm text-gray-700 leading-snug">
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-gray-400"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </span>
    </button>
  );
}

export default function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(readPrefs);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // Apply + persist whenever preferences change
  useEffect(() => {
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      /* private mode etc. — preferences just won't persist */
    }
  }, [prefs]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus && buttonRef.current) buttonRef.current.focus();
  }, []);

  // Escape closes; clicking/tapping outside closes without stealing focus
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        close(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Move focus into the panel when it opens
  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector("button:not([disabled])");
      if (first) first.focus();
    }
  }, [open]);

  const setSize = (size) =>
    setPrefs((p) => ({
      ...p,
      size: Math.min(Math.max(size, 0), TEXT_SIZES.length - 1),
    }));

  const isDefault =
    prefs.size === 0 && !prefs.contrast && !prefs.links;

  const stepButton =
    "inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gray-300 bg-white text-primary hover:border-primary hover:bg-primaryLight disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <div className="a11y-controls">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Accessibility options: text size, contrast and links"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg border-2 border-white hover:bg-primaryDark focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          className="fixed bottom-20 left-4 z-40 w-[min(22rem,calc(100vw-2rem))] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl bg-white p-4 shadow-brand-hover border border-gray-300"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-primary">
              Accessibility
            </h2>
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close accessibility options"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-gray-800 hover:bg-primaryLight focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mb-3">
            <p className="font-medium text-gray-900 mb-2" id="a11y-size-label">
              Text size
            </p>
            <div
              className="flex items-center gap-2"
              role="group"
              aria-labelledby="a11y-size-label"
            >
              <button
                type="button"
                className={stepButton}
                onClick={() => setSize(prefs.size - 1)}
                disabled={prefs.size === 0}
                aria-label="Decrease text size"
              >
                <Minus className="w-5 h-5" aria-hidden="true" />
              </button>
              <p
                className="flex-1 text-center font-medium text-gray-900"
                role="status"
                aria-live="polite"
              >
                {SIZE_LABELS[prefs.size]}
              </p>
              <button
                type="button"
                className={stepButton}
                onClick={() => setSize(prefs.size + 1)}
                disabled={prefs.size === TEXT_SIZES.length - 1}
                aria-label="Increase text size"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Switch
              checked={prefs.contrast}
              onChange={() => setPrefs((p) => ({ ...p, contrast: !p.contrast }))}
              label="High contrast"
              description="Darker text and borders"
            />
            <Switch
              checked={prefs.links}
              onChange={() => setPrefs((p) => ({ ...p, links: !p.links }))}
              label="Underline all links"
              description="Make every link easy to spot"
            />
          </div>

          <button
            type="button"
            onClick={() => setPrefs(DEFAULT_PREFS)}
            disabled={isDefault}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:border-primary hover:bg-primaryLight disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset to default
          </button>

          <p className="mt-3 text-sm text-gray-700 text-center">
            Need help using this site? Call{" "}
            <a
              href="tel:8172858515"
              className="text-primary underline underline-offset-4"
            >
              (817) 285-8515
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
