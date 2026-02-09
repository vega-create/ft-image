---
title: "Favicons in 2026: Sizes, Formats, and Best Practices"
description: "Everything you need to know about creating and implementing favicons."
publishDate: "2026-02-02"
category: "Technical"
tags: ["favicon", "design", "web"]
---

Favicons are the small icons that appear in browser tabs, bookmarks, and app shortcuts. Getting them right requires understanding the various sizes and formats needed across different platforms.

## Required Sizes

### Essential

32x32 pixels is the standard browser tab favicon. 16x16 is used in some older browsers and bookmark bars. These two sizes cover basic browser needs.

### Apple Touch Icon

180x180 pixels is needed for iOS home screen shortcuts. This is specified with a link tag using rel apple-touch-icon. Without this, iOS will use a screenshot of your page.

### Android and PWA

192x192 and 512x512 pixels are needed for Android home screen and Progressive Web App manifests. These are specified in the web app manifest file.

## Formats

SVG favicons are now supported by most modern browsers and are ideal because they scale to any size. PNG is the most widely supported raster format. ICO format is legacy but still useful for maximum compatibility.

## Creating Favicons

Use our Favicon Generator to create favicons from text or images. The text mode is great for quick, clean favicons using your brand initials. The image mode lets you upload a logo and export it at all needed sizes.

## Implementation

Add link tags in your HTML head for each favicon size. Include the web manifest file for PWA support. Test your favicons across browsers and devices.

## Design Tips

Keep it simple since favicons are tiny. Use bold shapes and high contrast. Your logo mark works better than your full logo. Test at 16x16 to ensure legibility at the smallest size.