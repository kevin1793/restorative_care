import React from "react";

/**
 * Embeds a single public Facebook post via the iframe plugin — no SDK or
 * App ID required (report §4.3, Option A). The Facebook Page and the
 * individual post must both be set to Public visibility or the embed
 * renders a blank box instead of the post.
 *
 * Not wired into any page yet: this needs real, public post URLs from
 * Juice before it can go live (see the "Facebook posts" open item in the
 * project report). Once URLs are available, render this in a
 * "From our Facebook Page" section — e.g. on the homepage or a dedicated
 * Updates page — passing each postUrl in.
 */
export default function FacebookPostEmbed({ postUrl, width = 500, height = 600 }) {
  const encodedUrl = encodeURIComponent(postUrl);
  const src = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&width=${width}&show_text=true`;

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      title="Facebook post"
    />
  );
}
