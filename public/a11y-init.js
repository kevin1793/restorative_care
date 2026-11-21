// Applies the visitor's saved accessibility preferences (text size, high
// contrast, underlined links) before the page first paints, so there is no
// flash of the default view. Must stay in sync with
// src/components/AccessibilityControls.js (same storage key and sizes).
try {
  var prefs = JSON.parse(localStorage.getItem("rc-a11y-prefs"));
  if (prefs) {
    var root = document.documentElement;
    var sizes = [18, 20, 22, 24];
    if (prefs.size > 0 && prefs.size < sizes.length) {
      root.style.fontSize = sizes[prefs.size] + "px";
    }
    if (prefs.contrast) root.classList.add("a11y-contrast");
    if (prefs.links) root.classList.add("a11y-links");
  }
} catch (e) {
  // Storage blocked or corrupt: just show the default view
}
