import React from "react";

// Confirmed Facebook Page (Status Update, July 23). This is a live
// timeline embed (Facebook's Page Plugin) — a different tool from
// FacebookPostEmbed.js, which embeds one specific post. Since the agency
// posts tips and updates frequently, a live feed shows new content
// automatically with zero ongoing maintenance, rather than needing
// someone to grab a new post URL every time (report §4.10).
const FACEBOOK_PAGE_URL =
  "https://www.facebook.com/profile.php?id=61584362892488";

export default function FacebookFeedEmbed() {
  const pageUrl = encodeURIComponent(FACEBOOK_PAGE_URL);
  const src = `https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <div className="bg-white rounded-2xl shadow-brand p-4 flex justify-center max-w-lg mx-auto">
      <iframe
        src={src}
        width="500"
        height="700"
        style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Restorative Care HHS Facebook feed"
      />
    </div>
  );
}

export { FACEBOOK_PAGE_URL };
