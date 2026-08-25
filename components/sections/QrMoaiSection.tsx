"use client";

import { Camera, Compass, Hand, MapPinned, Sparkles } from "lucide-react";
import type { LanguageCode } from "../../app/i18n";
import { useI18n } from "../../app/i18n-provider";
import { BrandBackdrop } from "../brand/BrandBackdrop";
import { ImageWatermark } from "../brand/ImageWatermark";
import { AssetImage } from "../common/AssetImage";

type QrMoaiCopy = {
  kicker: string;
  title: string;
  intro: string;
  heroAlt: string;
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  cards: Array<{
    title: string;
    body: string;
  }>;
  secretTitle: string;
  secretBody: string;
  stats: Array<[string, string]>;
};

const qrMoaiCopy: Record<LanguageCode, QrMoaiCopy> = {
  pl: {
    kicker: "QR Moai",
    title: "Małe posągi jako punkty orientacji, odpoczynku i odkrywania parku.",
    intro:
      "QR Moai to sieć niewielkich, kamiennych strażników rozmieszczonych na całym terenie obiektu. Każdy z nich działa jak słupek nawigacyjny, punkt fotograficzny i cicha zapowiedź dalszej trasy. Zwiedzający mogą podejść blisko, dotknąć faktury, usiąść obok, zrobić zdjęcie, a po zeskanowaniu kodu QR czasem odkryć dodatkową opowieść, zadanie albo niespodziankę.",
    heroAlt: "Niewielkie Moai w krajobrazie trawy i błękitnego nieba jako inspiracja dla punktów QR Moai.",
    gallery: [
      {
        src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp",
        alt: "Moai ustawione w trawiastym krajobrazie pod błękitnym niebem.",
        label: "Nawigacja w terenie"
      },
      {
        src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp",
        alt: "Zbliżenie na twarze Moai z otwartym niebem w tle.",
        label: "Bliski kontakt"
      },
      {
        src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp",
        alt: "Moai w ciepłym świetle zachodu słońca.",
        label: "Punkt fotograficzny"
      },
      {
        src: "/assets/qr-moai/qr-moai-family-optimized.webp",
        alt: "Zestaw małych figur Moai pokazujących różne warianty obiektów.",
        label: "Rodzina małych strażników"
      }
    ],
    cards: [
      {
        title: "Słupki nawigacyjne",
        body: "Każdy QR Moai prowadzi gościa przez park bez typowych tablic informacyjnych. Kamienna forma staje się częścią krajobrazu, a nie dodatkiem ustawionym obok niego."
      },
      {
        title: "Obiekty do spotkania",
        body: "Wysokość do około 1,5 m pozwala podejść blisko, oprzeć się obok, usiąść przy posągu i zrobić zdjęcie w ludzkiej skali, bez dystansu muzealnej gabloty."
      },
      {
        title: "QR z niespodzianką",
        body: "Kod może otwierać krótką historię, głos przewodnika, mapę kolejnego punktu, zadanie dla dzieci albo okazjonalny bonus dostępny tylko na miejscu."
      }
    ],
    secretTitle: "Ukryty rytm całego obiektu",
    secretBody:
      "Pełna liczba QR Moai nie musi być komunikowana wprost. Może stać się sekretem dla uważnych gości: kolekcją punktów do odnalezienia, sfotografowania i zeskanowania podczas kolejnych wizyt.",
    stats: [
      ["do 1,5 m", "wysokość przyjazna dotykowi i fotografii"],
      ["QR", "warstwa cyfrowych opowieści i nagród"],
      ["cały park", "nawigacja rozproszona po trasach"]
    ]
  },
  en: {
    kicker: "QR Moai",
    title: "Small statues as wayfinding, resting and discovery points.",
    intro:
      "QR Moai is a network of small stone guardians placed across the site. Each one works as a wayfinding post, photo point and quiet invitation to continue the route. Visitors can come close, touch the texture, sit beside it, take a photograph and sometimes unlock an extra story, task or surprise after scanning the QR code.",
    heroAlt: "Small Moai in a grassy landscape beneath a blue sky as inspiration for QR Moai points.",
    gallery: [
      {
        src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp",
        alt: "Moai in a grassy landscape under blue sky.",
        label: "Wayfinding"
      },
      {
        src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp",
        alt: "Close view of Moai faces against open sky.",
        label: "Close contact"
      },
      {
        src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp",
        alt: "Moai in warm sunset light.",
        label: "Photo point"
      },
      {
        src: "/assets/qr-moai/qr-moai-family-optimized.webp",
        alt: "Set of small Moai figures showing object variants.",
        label: "Small guardians"
      }
    ],
    cards: [
      {
        title: "Wayfinding posts",
        body: "Each QR Moai guides guests through the park without relying on ordinary signage. The stone form becomes part of the landscape itself."
      },
      {
        title: "Objects to meet",
        body: "At up to around 1.5 m high, the figures invite close contact, sitting nearby and photography at a human scale."
      },
      {
        title: "QR surprise",
        body: "The code can open a short story, guide voice, next route point, children's task or occasional bonus available only on site."
      }
    ],
    secretTitle: "A hidden rhythm across the site",
    secretBody:
      "The full number does not need to be stated directly. It can become a secret collection for attentive guests to find, photograph and scan over repeat visits.",
    stats: [
      ["up to 1.5 m", "touch and photo friendly height"],
      ["QR", "digital stories and rewards"],
      ["whole park", "distributed route guidance"]
    ]
  },
  fr: {
    kicker: "QR Moai",
    title: "De petits Moai comme reperes, pauses et points de decouverte.",
    intro:
      "QR Moai forme un reseau de petits gardiens de pierre places dans tout le parc. Chacun devient repere, point photo et invitation discrete a poursuivre le parcours.",
    heroAlt: "Petits Moai dans un paysage d'herbe et de ciel bleu.",
    gallery: [
      {
        src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp",
        alt: "Moai dans un paysage d'herbe.",
        label: "Reperage"
      },
      {
        src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp",
        alt: "Visages Moai en gros plan.",
        label: "Contact proche"
      },
      {
        src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp",
        alt: "Moai dans la lumiere du soir.",
        label: "Point photo"
      },
      { src: "/assets/qr-moai/qr-moai-family-optimized.webp", alt: "Petites figures Moai.", label: "Petits gardiens" }
    ],
    cards: [
      {
        title: "Reperes de parcours",
        body: "Chaque Moai guide le visiteur sans transformer le paysage en foret de panneaux."
      },
      {
        title: "Objets de rencontre",
        body: "Avec une hauteur jusqu'a environ 1,5 m, ils invitent au contact, a la pause et a la photographie."
      },
      {
        title: "Surprise QR",
        body: "Le code peut ouvrir une histoire courte, une voix de guide, un defi ou un bonus disponible sur place."
      }
    ],
    secretTitle: "Un rythme cache dans le parc",
    secretBody: "Le nombre complet peut rester un secret a decouvrir par les visiteurs attentifs.",
    stats: [
      ["jusqu'a 1,5 m", "hauteur proche du visiteur"],
      ["QR", "histoires et surprises"],
      ["tout le parc", "orientation diffuse"]
    ]
  },
  es: {
    kicker: "QR Moai",
    title: "Pequenos Moai como orientacion, descanso y descubrimiento.",
    intro:
      "QR Moai crea una red de pequenos guardianes de piedra repartidos por el parque. Cada uno orienta, invita a una foto y puede abrir una sorpresa al escanear el codigo.",
    heroAlt: "Pequenos Moai en paisaje verde bajo cielo azul.",
    gallery: [
      {
        src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp",
        alt: "Moai en paisaje de hierba.",
        label: "Orientacion"
      },
      {
        src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp",
        alt: "Rostros Moai de cerca.",
        label: "Contacto cercano"
      },
      {
        src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp",
        alt: "Moai al atardecer.",
        label: "Punto fotografico"
      },
      {
        src: "/assets/qr-moai/qr-moai-family-optimized.webp",
        alt: "Pequenas figuras Moai.",
        label: "Pequenos guardianes"
      }
    ],
    cards: [
      {
        title: "Postes de ruta",
        body: "Cada QR Moai guia al visitante sin depender de senalizacion convencional."
      },
      {
        title: "Objetos para acercarse",
        body: "Con hasta unos 1,5 m de altura, permiten acercarse, sentarse junto a ellos y fotografiarse."
      },
      {
        title: "Sorpresa QR",
        body: "El codigo puede abrir una historia, una pista, una tarea para ninos o un bonus del lugar."
      }
    ],
    secretTitle: "Un ritmo secreto en el parque",
    secretBody:
      "La cifra completa puede quedar como secreto para quienes los busquen y escaneen durante la visita.",
    stats: [
      ["hasta 1,5 m", "escala cercana"],
      ["QR", "historias y premios"],
      ["todo el parque", "guia distribuida"]
    ]
  },
  de: {
    kicker: "QR Moai",
    title: "Kleine Moai als Orientierung, Ruhepunkt und Entdeckung.",
    intro:
      "QR Moai bildet ein Netz kleiner steinerner Waechter im ganzen Park. Jeder Punkt fuehrt, wird zum Fotomotiv und kann nach dem Scannen eine kleine Ueberraschung oeffnen.",
    heroAlt: "Kleine Moai in Graslandschaft unter blauem Himmel.",
    gallery: [
      {
        src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp",
        alt: "Moai in Graslandschaft.",
        label: "Orientierung"
      },
      {
        src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp",
        alt: "Moai Gesichter aus der Naehe.",
        label: "Naher Kontakt"
      },
      { src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp", alt: "Moai im Abendlicht.", label: "Fotopunkt" },
      { src: "/assets/qr-moai/qr-moai-family-optimized.webp", alt: "Kleine Moai Figuren.", label: "Kleine Waechter" }
    ],
    cards: [
      {
        title: "Wegmarken",
        body: "Jeder QR Moai fuehrt durch den Park, ohne die Landschaft mit klassischen Tafeln zu ueberladen."
      },
      {
        title: "Objekte der Naehe",
        body: "Bis etwa 1,5 m Hoehe laden sie zum Beruehren, Sitzen und Fotografieren ein."
      },
      {
        title: "QR Ueberraschung",
        body: "Der Code kann eine Geschichte, eine Route, eine Kinderaufgabe oder einen Bonus oeffnen."
      }
    ],
    secretTitle: "Ein verborgener Rhythmus",
    secretBody: "Die ganze Anzahl kann ein Geheimnis bleiben, das aufmerksame Gaeste im Park entdecken.",
    stats: [
      ["bis 1,5 m", "nahbare Hoehe"],
      ["QR", "Geschichten und Boni"],
      ["ganzer Park", "verteilte Orientierung"]
    ]
  },
  cs: {
    kicker: "QR Moai",
    title: "Male Moai jako orientacni body, mista odpocinku a objevovani.",
    intro:
      "QR Moai je sit malych kamennych strazcu rozmistenych po celem arealu. Kazdy pomaha s orientaci, laka k fotografii a po naskenovani muze otevrit pribeh nebo prekvapeni.",
    heroAlt: "Male Moai v travnate krajine pod modrou oblohou.",
    gallery: [
      { src: "/assets/qr-moai/qr-moai-path-marker-optimized.webp", alt: "Moai v travnate krajine.", label: "Orientace" },
      { src: "/assets/qr-moai/qr-moai-close-sky-optimized.webp", alt: "Detail tvari Moai.", label: "Blizky kontakt" },
      {
        src: "/assets/qr-moai/qr-moai-sunset-field-optimized.webp",
        alt: "Moai v zapadovem svetle.",
        label: "Fotopoint"
      },
      { src: "/assets/qr-moai/qr-moai-family-optimized.webp", alt: "Male figury Moai.", label: "Mali strazci" }
    ],
    cards: [
      {
        title: "Navigacni sloupky",
        body: "Kazdy QR Moai vede navstevnika parkem bez beznych informacnich tabuli."
      },
      {
        title: "Objekty k setkani",
        body: "Vyska do priblizne 1,5 m zve k blizkemu kontaktu, posezeni a fotografii."
      },
      {
        title: "QR prekvapeni",
        body: "Kod muze otevrit kratky pribeh, dalsi bod trasy, ukol pro deti nebo bonus."
      }
    ],
    secretTitle: "Skryty rytmus arealu",
    secretBody: "Cely pocet muze zustat tajemstvim pro pozorne navstevniky.",
    stats: [
      ["do 1,5 m", "lidske meritko"],
      ["QR", "pribehy a odmeny"],
      ["cely park", "rozmistena navigace"]
    ]
  }
};

const icons = [MapPinned, Hand, Sparkles];

export function QrMoaiSection() {
  const { language } = useI18n();
  const section = qrMoaiCopy[language];

  return (
    <section
      id="qr-moai"
      className="relative overflow-hidden bg-[#071426] px-6 py-28 text-white sm:py-32 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(184,150,72,0.16),transparent_28%),linear-gradient(180deg,#071426,#02080d)]"
        aria-hidden="true"
      />
      <BrandBackdrop />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">{section.kicker}</p>
            <h2 className="mt-5 max-w-4xl text-balance font-serif text-[2.55rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {section.title}
            </h2>
          </div>
          <p className="text-white/74 border-l border-gold/55 pl-6 text-lg leading-9 sm:pl-7 sm:text-xl">
            {section.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.16fr_0.84fr]">
          <div className="border-white/12 relative min-h-[520px] overflow-hidden rounded-lg border bg-navy shadow-architectural sm:min-h-[680px]">
            <AssetImage
              src={section.gallery[0].src}
              alt={section.heroAlt}
              fill
              className="object-cover object-[48%_center]"
              sizes="(min-width: 1024px) 820px, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,12,24,0.42),rgba(4,12,24,0.02)_56%),linear-gradient(0deg,rgba(4,12,24,0.56),transparent_38%)]" />
            <ImageWatermark />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
              <div className="inline-flex items-center gap-3 border border-gold/45 bg-navy/70 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
                <Compass size={16} aria-hidden="true" />
                {section.gallery[0].label}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {section.gallery.slice(1).map((image) => (
              <figure
                key={image.src}
                className="border-white/12 relative min-h-[210px] overflow-hidden rounded-lg border bg-navy shadow-architectural sm:min-h-[240px]"
              >
                <AssetImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 540px, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,24,0.06),rgba(4,12,24,0.58))]" />
                <ImageWatermark className="opacity-[0.1] sm:opacity-[0.13]" />
                <figcaption className="border-white/18 absolute bottom-4 left-4 border bg-navy/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {section.cards.map((card, index) => {
            const Icon = icons[index] ?? Camera;

            return (
              <article
                key={card.title}
                className="border-white/12 rounded-lg border bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.055] sm:p-8"
              >
                <Icon className="text-gold" size={30} aria-hidden="true" />
                <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-white">
                  {card.title}
                </h3>
                <p className="text-white/68 mt-4 text-base leading-8">{card.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 rounded-lg border border-gold/30 bg-[linear-gradient(135deg,rgba(184,150,72,0.12),rgba(255,255,255,0.035))] p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-kicker">{section.secretTitle}</p>
            <p className="text-white/76 mt-4 text-lg leading-8 sm:text-xl">{section.secretBody}</p>
          </div>
          <div className="border-white/12 bg-white/12 grid gap-px overflow-hidden rounded border sm:grid-cols-3">
            {section.stats.map(([value, label]) => (
              <div key={value} className="bg-navy/82 p-5">
                <strong className="block font-serif text-3xl font-semibold text-gold">{value}</strong>
                <span className="text-white/64 mt-2 block text-sm leading-6">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
