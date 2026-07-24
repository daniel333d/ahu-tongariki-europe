export const localizedButton = {
  name: "localizedButton",
  title: "Button",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "localizedString" },
    { name: "href", title: "URL / anchor", type: "string" },
    { name: "ariaLabel", title: "ARIA label", type: "localizedString" }
  ],
  preview: {
    select: {
      title: "label.pl",
      subtitle: "href"
    }
  }
};

export const localizedGalleryItem = {
  name: "localizedGalleryItem",
  title: "Gallery item",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true }
    },
    { name: "caption", title: "Caption", type: "localizedText" },
    { name: "alt", title: "Alt text", type: "localizedString" }
  ],
  preview: {
    select: {
      title: "caption.pl",
      media: "image"
    }
  }
};

export const localizedCard = {
  name: "localizedCard",
  title: "Card",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "localizedString" },
    { name: "subtitle", title: "Subtitle", type: "localizedString" },
    { name: "description", title: "Description", type: "localizedText" },
    { name: "content", title: "Content", type: "localizedContent" },
    { name: "buttons", title: "Buttons", type: "array", of: [{ type: "localizedButton" }] },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "caption", title: "Caption", type: "localizedText" },
    { name: "alt", title: "Alt text", type: "localizedString" }
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "subtitle.pl",
      media: "image"
    }
  }
};

export const localizedTimelineItem = {
  name: "localizedTimelineItem",
  title: "Timeline item",
  type: "object",
  fields: [
    { name: "date", title: "Date / period", type: "string" },
    { name: "title", title: "Title", type: "localizedString" },
    { name: "subtitle", title: "Subtitle", type: "localizedString" },
    { name: "description", title: "Description", type: "localizedText" },
    { name: "caption", title: "Caption", type: "localizedText" }
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "date"
    }
  }
};

export const localizedEvent = {
  name: "localizedEvent",
  title: "Event",
  type: "object",
  fields: [
    { name: "date", title: "Date", type: "datetime" },
    { name: "title", title: "Title", type: "localizedString" },
    { name: "subtitle", title: "Subtitle", type: "localizedString" },
    { name: "description", title: "Description", type: "localizedText" },
    { name: "content", title: "Content", type: "localizedContent" },
    { name: "location", title: "Location", type: "localizedString" },
    { name: "buttons", title: "Buttons", type: "array", of: [{ type: "localizedButton" }] },
    { name: "caption", title: "Caption", type: "localizedText" },
    { name: "alt", title: "Alt text", type: "localizedString" }
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "date"
    }
  }
};

export const localizedSeo = {
  name: "localizedSeo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "title", title: "SEO title", type: "localizedString" },
    { name: "description", title: "Meta description", type: "localizedText" },
    { name: "canonical", title: "Canonical URL", type: "localizedString" },
    { name: "locale", title: "Open Graph locale", type: "localizedString" },
    {
      name: "image",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true }
    }
  ]
};

export const localizedDictionary = {
  name: "localizedDictionary",
  title: "Full dictionary override",
  type: "object",
  fields: [
    { name: "pl", title: "Polski", type: "text", rows: 18 },
    { name: "en", title: "English", type: "text", rows: 18 },
    { name: "fr", title: "Français", type: "text", rows: 18 },
    { name: "es", title: "Español", type: "text", rows: 18 },
    { name: "de", title: "Deutsch", type: "text", rows: 18 },
    { name: "cs", title: "Čeština", type: "text", rows: 18 }
  ],
  description: "Optional partial common.json override as JSON text. Use only for structured copy that mirrors the application dictionary."
};

export const siteContent = {
  name: "siteContent",
  title: "Rapa Nui Park – multilingual content",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "localizedString" },
    { name: "subtitle", title: "Subtitle", type: "localizedString" },
    { name: "description", title: "Description", type: "localizedText" },
    { name: "content", title: "Content", type: "localizedContent" },
    { name: "buttons", title: "Buttons", type: "array", of: [{ type: "localizedButton" }] },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "localizedGalleryItem" }] },
    { name: "cards", title: "Cards", type: "array", of: [{ type: "localizedCard" }] },
    { name: "timeline", title: "Timeline", type: "array", of: [{ type: "localizedTimelineItem" }] },
    { name: "events", title: "Events", type: "array", of: [{ type: "localizedEvent" }] },
    {
      name: "captions",
      title: "Captions",
      type: "object",
      fields: [
        { name: "pl", title: "Polski", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] },
        { name: "en", title: "English", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] },
        { name: "fr", title: "Français", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] },
        { name: "es", title: "Español", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] },
        { name: "de", title: "Deutsch", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] },
        { name: "cs", title: "Čeština", type: "object", fields: [{ name: "hero", title: "Hero", type: "text" }, { name: "gallery", title: "Gallery", type: "text" }] }
      ]
    },
    {
      name: "alt",
      title: "ALT texts",
      type: "object",
      fields: [
        { name: "pl", title: "Polski", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] },
        { name: "en", title: "English", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] },
        { name: "fr", title: "Français", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] },
        { name: "es", title: "Español", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] },
        { name: "de", title: "Deutsch", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] },
        { name: "cs", title: "Čeština", type: "object", fields: [{ name: "hero", title: "Hero", type: "string" }, { name: "slogan", title: "Slogan", type: "string" }, { name: "map", title: "Map", type: "string" }, { name: "night", title: "Night", type: "string" }] }
      ]
    },
    { name: "seo", title: "SEO", type: "localizedSeo" },
    { name: "dictionary", title: "Application dictionary override", type: "localizedDictionary" }
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "subtitle.pl"
    }
  }
};
