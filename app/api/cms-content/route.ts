import { NextRequest, NextResponse } from "next/server";
import { dictionaries, isLanguageCode, type Dictionary, type LanguageCode } from "../../i18n";
import { mergeDictionary, type DeepPartial } from "../../lib/i18n-merge";

export const runtime = "nodejs";

type SanityLocalizedContent = {
  dictionary?: DeepPartial<Dictionary> | string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  buttons?: Array<{ label?: string; href?: string; ariaLabel?: string }>;
  gallery?: Array<{ image?: unknown; caption?: string; alt?: string }>;
  cards?: Array<{ title?: string; subtitle?: string; description?: string; content?: string }>;
  timeline?: Array<{ title?: string; subtitle?: string; description?: string; date?: string }>;
  events?: Array<{
    title?: string;
    subtitle?: string;
    description?: string;
    date?: string;
    location?: string;
  }>;
  captions?: Record<string, string>;
  alt?: Record<string, string>;
  seo?: DeepPartial<Dictionary["seo"]>;
};

function localize(field: string, language: LanguageCode) {
  return `"${field}": coalesce(${field}.${language}, ${field}.pl)`;
}

function sanityQuery(language: LanguageCode) {
  return `*[_type == "siteContent"][0]{
    ${localize("dictionary", language)},
    ${localize("title", language)},
    ${localize("subtitle", language)},
    ${localize("description", language)},
    ${localize("content", language)},
    "buttons": buttons[]{..., "label": coalesce(label.${language}, label.pl), "ariaLabel": coalesce(ariaLabel.${language}, ariaLabel.pl)},
    "gallery": gallery[]{..., "caption": coalesce(caption.${language}, caption.pl), "alt": coalesce(alt.${language}, alt.pl)},
    "cards": cards[]{..., "title": coalesce(title.${language}, title.pl), "subtitle": coalesce(subtitle.${language}, subtitle.pl), "description": coalesce(description.${language}, description.pl), "content": coalesce(content.${language}, content.pl)},
    "timeline": timeline[]{..., "title": coalesce(title.${language}, title.pl), "subtitle": coalesce(subtitle.${language}, subtitle.pl), "description": coalesce(description.${language}, description.pl)},
    "events": events[]{..., "title": coalesce(title.${language}, title.pl), "subtitle": coalesce(subtitle.${language}, subtitle.pl), "description": coalesce(description.${language}, description.pl), "location": coalesce(location.${language}, location.pl)},
    ${localize("captions", language)},
    ${localize("alt", language)},
    "seo": {
      "title": coalesce(seo.title.${language}, seo.title.pl),
      "description": coalesce(seo.description.${language}, seo.description.pl),
      "image": seo.image,
      "canonical": coalesce(seo.canonical.${language}, seo.canonical.pl),
      "locale": coalesce(seo.locale.${language}, seo.locale.pl)
    }
  }`;
}

function mapCmsToDictionary(cms: SanityLocalizedContent, fallback: Dictionary): DeepPartial<Dictionary> {
  const dictionaryOverride =
    typeof cms.dictionary === "string" ? parseDictionaryOverride(cms.dictionary) : cms.dictionary;

  return {
    ...dictionaryOverride,
    hero: {
      ...dictionaryOverride?.hero,
      title: cms.title || dictionaryOverride?.hero?.title,
      subtitle: cms.subtitle || dictionaryOverride?.hero?.subtitle,
      imageAlt: cms.alt?.hero || dictionaryOverride?.hero?.imageAlt
    },
    project: {
      ...dictionaryOverride?.project,
      title: dictionaryOverride?.project?.title,
      body: cms.description || cms.content || dictionaryOverride?.project?.body
    },
    slogan: {
      ...dictionaryOverride?.slogan,
      imageAlt: cms.alt?.slogan || dictionaryOverride?.slogan?.imageAlt
    },
    location: {
      ...dictionaryOverride?.location,
      mapAlt: cms.alt?.map || dictionaryOverride?.location?.mapAlt
    },
    night: {
      ...dictionaryOverride?.night,
      imageAlt: cms.alt?.night || dictionaryOverride?.night?.imageAlt
    },
    contact: {
      ...dictionaryOverride?.contact,
      intro: dictionaryOverride?.contact?.intro || fallback.contact.intro
    },
    seo: {
      ...dictionaryOverride?.seo,
      ...cms.seo
    }
  };
}

function parseDictionaryOverride(value: string): DeepPartial<Dictionary> | null {
  try {
    const parsed = JSON.parse(value) as DeepPartial<Dictionary>;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const requestedLanguage = request.nextUrl.searchParams.get("language") || "pl";
  const language = isLanguageCode(requestedLanguage) ? requestedLanguage : "pl";
  const fallback = dictionaries[language];
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";

  if (!projectId || !dataset) {
    return NextResponse.json({
      source: "local",
      language,
      dictionary: fallback
    });
  }

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", sanityQuery(language));

  try {
    const response = await fetch(url, {
      headers: process.env.SANITY_API_READ_TOKEN
        ? { Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}` }
        : undefined,
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          source: "local",
          language,
          dictionary: fallback
        },
        { status: 200 }
      );
    }

    const payload = (await response.json()) as { result?: SanityLocalizedContent | null };
    const cmsDictionary = payload.result ? mapCmsToDictionary(payload.result, fallback) : null;

    return NextResponse.json({
      source: payload.result ? "sanity" : "local",
      language,
      dictionary: mergeDictionary(fallback, cmsDictionary)
    });
  } catch {
    return NextResponse.json({
      source: "local",
      language,
      dictionary: fallback
    });
  }
}
