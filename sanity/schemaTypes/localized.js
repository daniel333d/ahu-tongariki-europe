const languages = [
  { id: "pl", title: "Polski" },
  { id: "en", title: "English" },
  { id: "fr", title: "Français" },
  { id: "es", title: "Español" },
  { id: "de", title: "Deutsch" },
  { id: "cs", title: "Čeština" }
];

function localizedFields(type, rows) {
  return languages.map((language) => ({
    name: language.id,
    title: language.title,
    type,
    rows,
    validation: language.id === "pl" ? (Rule) => Rule.required() : undefined
  }));
}

export const localizedString = {
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: localizedFields("string")
};

export const localizedText = {
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: localizedFields("text", 4)
};

export const localizedContent = {
  name: "localizedContent",
  title: "Localized content",
  type: "object",
  fields: localizedFields("text", 8)
};

export const localizedJson = {
  name: "localizedJson",
  title: "Localized JSON dictionary override",
  type: "object",
  fields: languages.map((language) => ({
    name: language.id,
    title: language.title,
    type: "object",
    fields: [
      {
        name: "json",
        title: "JSON",
        type: "text",
        rows: 18,
        description: "Optional complete or partial common.json override for this language."
      }
    ]
  }))
};

export { languages };
