"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type CSSProperties, useEffect, useState } from "react";
import type { LanguageCode } from "../../app/i18n";
import { useI18n } from "../../app/i18n-provider";
import { BrandBackdrop } from "../brand/BrandBackdrop";

type StoryImage = {
  src?: string;
  alt?: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  tone?: "warm" | "deep" | "dark";
};

type StoryChapter = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  quote: string;
  paragraphs: string[];
  aside?: { title: string; body: string; variant?: "note" | "disclaimer" };
  endLine: string;
  image: StoryImage;
  alignOverride?: "left" | "right";
  softOverlay?: boolean;
};

type StoryChapterMeta = {
  id: string;
  number: string;
  image: Omit<StoryImage, "alt">;
  alignOverride?: "left" | "right";
  softOverlay?: boolean;
  asideVariant?: "note" | "disclaimer";
};

type StoryChapterText = {
  eyebrow: string;
  title: string;
  quote: string;
  paragraphs: string[];
  imageAlt: string;
  aside?: { title: string; body: string };
  endLine: string;
};

type OpeningContent = {
  eyebrow: string;
  title: string;
  lead: string[];
  quote: string;
  imageAlt: string;
};

type TimelineItem = {
  date: string;
  text: string;
};

type SourceMeta = {
  name: string;
  href: string;
};

type SourceItem = SourceMeta & {
  scope: string;
};

type StoryUi = {
  timelineTitle: string;
  sourcesTitle: string;
  sourcesSummary: string;
  sourceLinkLabel: string;
  visualNoteLabel: string;
  visualNoteBody: string;
  transitionLabel: string;
  nextSectionLabel: string;
  bridgeLine: string;
};

const IMAGE_PATH = "/images/rapa-nui-story";

const images = {
  island: `${IMAGE_PATH}/01-rapa-nui-island.webp`,
  people: `${IMAGE_PATH}/02-living-culture-kai-kai.webp`,
  ranoRaraku: `${IMAGE_PATH}/03-rano-raraku-moai.webp`,
  ancestorEye: `${IMAGE_PATH}/04-moai-eye-ancestor.webp`,
  orongo: `${IMAGE_PATH}/05-orongo-cliffs.webp`,
  livingTradition: `${IMAGE_PATH}/06-living-tradition-carving.webp`
};

const uiByLanguage: Record<LanguageCode, StoryUi> = {
  pl: {
    timelineTitle: "Oś czasu",
    sourcesTitle: "Źródła i nota historyczna",
    sourcesSummary:
      "Narracja opiera się na materiałach UNESCO, Museo de Rapa Nui, chilijskiej Biblioteki Narodowej oraz współczesnych badaniach archeologicznych i genetycznych. W miejscach, w których tradycja ustna i nauka opisują przeszłość odmiennymi językami, tekst świadomie rozróżnia oba rodzaje świadectwa.",
    sourceLinkLabel: "Otwórz źródło",
    visualNoteLabel: "Nota wizualna",
    visualNoteBody:
      "Warstwa wizualna: artystyczne wizualizacje inspirowane krajobrazem i kulturą Rapa Nui, wygenerowane cyfrowo. Tekst historyczny opiera się na źródłach wymienionych w nocie.",
    transitionLabel: "Przejście do istniejącej sekcji",
    nextSectionLabel: "Zobacz: Przebudzenie Moai",
    bridgeLine: "Kiedy oczy wracają na swoje miejsce, kamień ponownie staje się spojrzeniem."
  },
  en: {
    timelineTitle: "Timeline",
    sourcesTitle: "Sources and historical note",
    sourcesSummary:
      "The narrative is based on UNESCO, Museo de Rapa Nui, the National Library of Chile and contemporary archaeological and genetic research. Where oral tradition and scholarship describe the past in different languages, the text keeps those forms of evidence distinct.",
    sourceLinkLabel: "Open source",
    visualNoteLabel: "Visual note",
    visualNoteBody:
      "Visual layer: artistic visualisations inspired by the landscape and culture of Rapa Nui, generated digitally. The historical text is based on the sources listed in this note.",
    transitionLabel: "Transition to the existing section",
    nextSectionLabel: "Next: Awakening of the Moai",
    bridgeLine: "When the eyes return to their place, stone becomes a gaze once more."
  },
  fr: {
    timelineTitle: "Chronologie",
    sourcesTitle: "Sources et note historique",
    sourcesSummary:
      "Le récit s'appuie sur l'UNESCO, le Museo de Rapa Nui, la Bibliothèque nationale du Chili et des recherches archéologiques et génétiques contemporaines. Lorsque la tradition orale et la recherche décrivent le passé avec des langages différents, le texte distingue consciemment ces formes de témoignage.",
    sourceLinkLabel: "Ouvrir la source",
    visualNoteLabel: "Note visuelle",
    visualNoteBody:
      "Couche visuelle : visualisations artistiques inspirées du paysage et de la culture de Rapa Nui, générées numériquement. Le texte historique s'appuie sur les sources indiquées dans cette note.",
    transitionLabel: "Transition vers la section existante",
    nextSectionLabel: "Suivant : Réveil du Moai",
    bridgeLine: "Quand les yeux reprennent leur place, la pierre redevient un regard."
  },
  es: {
    timelineTitle: "Cronología",
    sourcesTitle: "Fuentes y nota histórica",
    sourcesSummary:
      "La narración se basa en materiales de UNESCO, Museo de Rapa Nui, Biblioteca Nacional de Chile e investigaciones arqueológicas y genéticas contemporáneas. Cuando la tradición oral y la ciencia describen el pasado con lenguajes distintos, el texto diferencia conscientemente ambos tipos de testimonio.",
    sourceLinkLabel: "Abrir fuente",
    visualNoteLabel: "Nota visual",
    visualNoteBody:
      "Capa visual: visualizaciones artísticas inspiradas en el paisaje y la cultura de Rapa Nui, generadas digitalmente. El texto histórico se basa en las fuentes indicadas en esta nota.",
    transitionLabel: "Transición a la sección existente",
    nextSectionLabel: "Siguiente: El Despertar del Moai",
    bridgeLine: "Cuando los ojos vuelven a su lugar, la piedra se convierte de nuevo en mirada."
  },
  de: {
    timelineTitle: "Zeitleiste",
    sourcesTitle: "Quellen und historische Notiz",
    sourcesSummary:
      "Die Erzählung basiert auf Materialien der UNESCO, des Museo de Rapa Nui, der Chilenischen Nationalbibliothek sowie aktueller archäologischer und genetischer Forschung. Wo mündliche Überlieferung und Wissenschaft die Vergangenheit in unterschiedlichen Sprachen beschreiben, unterscheidet der Text beide Zeugnisformen bewusst.",
    sourceLinkLabel: "Quelle öffnen",
    visualNoteLabel: "Visuelle Notiz",
    visualNoteBody:
      "Visuelle Ebene: künstlerische, digital erzeugte Visualisierungen, inspiriert von Landschaft und Kultur Rapa Nuis. Der historische Text stützt sich auf die in dieser Notiz genannten Quellen.",
    transitionLabel: "Übergang zum bestehenden Abschnitt",
    nextSectionLabel: "Weiter: Erwachen des Moai",
    bridgeLine: "Wenn die Augen an ihren Platz zurückkehren, wird der Stein erneut zum Blick."
  },
  cs: {
    timelineTitle: "Časová osa",
    sourcesTitle: "Zdroje a historická poznámka",
    sourcesSummary:
      "Vyprávění vychází z materiálů UNESCO, Museo de Rapa Nui, Chilské národní knihovny a současných archeologických a genetických výzkumů. Tam, kde ústní tradice a věda popisují minulost odlišnými jazyky, text oba druhy svědectví vědomě rozlišuje.",
    sourceLinkLabel: "Otevřít zdroj",
    visualNoteLabel: "Vizuální poznámka",
    visualNoteBody:
      "Vizuální vrstva: umělecké vizualizace inspirované krajinou a kulturou Rapa Nui, vytvořené digitálně. Historický text vychází ze zdrojů uvedených v této poznámce.",
    transitionLabel: "Přechod do stávající sekce",
    nextSectionLabel: "Dále: Probuzení Moai",
    bridgeLine: "Když se oči vrátí na své místo, kámen se znovu stává pohledem."
  }
};

const openingByLanguage: Record<LanguageCode, OpeningContent> = {
  pl: {
    eyebrow: "RAPA NUI - WYSPA ŻYWYCH PRZODKÓW",
    title: "Wyspa, która nauczyła kamień patrzeć",
    lead: [
      "To nie jest historia \"zaginionej cywilizacji\". To historia polinezyjskich żeglarzy, rodzin, rolników, rybaków, rzeźbiarzy i strażników pamięci - oraz ich potomków, którzy nadal nazywają Rapa Nui domem.",
      "Na jednej z najbardziej odizolowanych zamieszkanych wysp świata ludzie stworzyli setki ceremonialnych platform i niemal dziewięćset moai. Jeszcze większym osiągnięciem było jednak to, że przez stulecia potrafili zbudować wspólnotę, przystosować się do wymagającego środowiska, przetrwać niewolnicze najazdy, epidemie i kolonialną eksploatację, a następnie przekazać swoją kulturę kolejnym pokoleniom."
    ],
    quote: "Zanim kamień otrzymał twarz, człowiek musiał pokonać ocean.",
    imageAlt: "Artystyczna wizualizacja wulkanicznej wyspy Rapa Nui otoczonej wodami Pacyfiku."
  },
  en: {
    eyebrow: "RAPA NUI - ISLAND OF LIVING ANCESTORS",
    title: "The island that taught stone to see",
    lead: [
      "This is not a story of a \"lost civilization\". It is the story of Polynesian navigators, families, farmers, fishermen, carvers and keepers of memory - and of their descendants, who still call Rapa Nui home.",
      "On one of the most isolated inhabited islands on Earth, people built hundreds of ceremonial platforms and nearly nine hundred moai. An even greater achievement, though, was that for centuries they built a community, adapted to a demanding environment, survived slave raids, epidemics and colonial exploitation, and then passed their culture on to the generations that followed."
    ],
    quote: "Before stone received a face, humans had to cross an ocean.",
    imageAlt: "Artistic visualisation of the volcanic island of Rapa Nui surrounded by the waters of the Pacific."
  },
  fr: {
    eyebrow: "RAPA NUI - L'ÎLE DES ANCÊTRES VIVANTS",
    title: "L'île qui a appris à la pierre à regarder",
    lead: [
      "Ce n'est pas l'histoire d'une « civilisation perdue ». C'est l'histoire de navigateurs polynésiens, de familles, de paysans, de pêcheurs, de sculpteurs et de gardiens de la mémoire - et de leurs descendants, qui appellent encore Rapa Nui leur foyer.",
      "Sur l'une des îles habitées les plus isolées du monde, des hommes ont bâti des centaines de plateformes cérémonielles et près de neuf cents moai. Mais l'exploit le plus grand fut, pendant des siècles, de bâtir une communauté, de s'adapter à un environnement exigeant, de survivre aux razzias esclavagistes, aux épidémies et à l'exploitation coloniale, puis de transmettre leur culture aux générations suivantes."
    ],
    quote: "Avant que la pierre ne reçoive un visage, l'homme a dû traverser un océan.",
    imageAlt: "Visualisation artistique de l'île volcanique de Rapa Nui entourée des eaux du Pacifique."
  },
  es: {
    eyebrow: "RAPA NUI - LA ISLA DE LOS ANCESTROS VIVOS",
    title: "La isla que enseñó a mirar a la piedra",
    lead: [
      "Esta no es la historia de una «civilización perdida». Es la historia de navegantes polinesios, familias, agricultores, pescadores, escultores y guardianes de la memoria - y de sus descendientes, que todavía llaman hogar a Rapa Nui.",
      "En una de las islas habitadas más aisladas del mundo, sus habitantes crearon cientos de plataformas ceremoniales y casi novecientos moáis. Pero un logro aún mayor fue que, durante siglos, supieron construir una comunidad, adaptarse a un entorno exigente, sobrevivir a las razias esclavistas, a las epidemias y a la explotación colonial, y transmitir después su cultura a las generaciones siguientes."
    ],
    quote: "Antes de que la piedra recibiera un rostro, el hombre tuvo que cruzar un océano.",
    imageAlt: "Visualización artística de la isla volcánica de Rapa Nui rodeada por las aguas del Pacífico."
  },
  de: {
    eyebrow: "RAPA NUI - INSEL DER LEBENDIGEN AHNEN",
    title: "Die Insel, die dem Stein das Sehen lehrte",
    lead: [
      "Dies ist nicht die Geschichte einer „verlorenen Zivilisation\". Es ist die Geschichte polynesischer Seefahrer, Familien, Bauern, Fischer, Bildhauer und Hüter der Erinnerung - und ihrer Nachkommen, die Rapa Nui noch heute ihr Zuhause nennen.",
      "Auf einer der abgelegensten bewohnten Inseln der Welt schufen Menschen Hunderte zeremonieller Plattformen und fast neunhundert Moai. Die noch größere Leistung aber war, dass sie über Jahrhunderte hinweg eine Gemeinschaft aufbauen, sich einer anspruchsvollen Umwelt anpassen, Sklavenüberfälle, Epidemien und koloniale Ausbeutung überstehen und ihre Kultur schließlich an die nächsten Generationen weitergeben konnten."
    ],
    quote: "Bevor der Stein ein Gesicht erhielt, musste der Mensch einen Ozean überwinden.",
    imageAlt: "Künstlerische Visualisierung der vulkanischen Insel Rapa Nui, umgeben von den Gewässern des Pazifiks."
  },
  cs: {
    eyebrow: "RAPA NUI - OSTROV ŽIVÝCH PŘEDKŮ",
    title: "Ostrov, který naučil kámen dívat se",
    lead: [
      "Toto není příběh „ztracené civilizace\". Je to příběh polynéských mořeplavců, rodin, zemědělců, rybářů, řezbářů a strážců paměti - a jejich potomků, kteří dodnes nazývají Rapa Nui domovem.",
      "Na jednom z nejizolovanějších obydlených ostrovů světa lidé vytvořili stovky obřadních plošin a téměř devět set moai. Ještě větším úspěchem však bylo, že po staletí dokázali budovat společenství, přizpůsobovat se náročnému prostředí, přežít otrokářské nájezdy, epidemie a koloniální vykořisťování a poté předat svou kulturu dalším generacím."
    ],
    quote: "Než kámen dostal tvář, člověk musel překonat oceán.",
    imageAlt: "Umělecká vizualizace sopečného ostrova Rapa Nui obklopeného vodami Pacifiku."
  }
};

const chapterMeta: StoryChapterMeta[] = [
  {
    id: "ocean",
    number: "01",
    image: {
      src: images.orongo,
      objectPosition: "38% 62%",
      mobileObjectPosition: "30% 68%",
      tone: "deep"
    }
  },
  {
    id: "adaptacja",
    number: "02",
    image: {
      src: images.people,
      objectPosition: "63% center",
      mobileObjectPosition: "67% center",
      tone: "warm"
    }
  },
  {
    id: "ahu-moai",
    number: "03",
    image: {
      src: images.ranoRaraku,
      objectPosition: "58% center",
      mobileObjectPosition: "64% center",
      tone: "deep"
    }
  },
  {
    id: "rano-raraku",
    number: "04",
    asideVariant: "note",
    image: {
      src: images.ranoRaraku,
      objectPosition: "72% center",
      mobileObjectPosition: "76% center",
      tone: "deep"
    }
  },
  {
    id: "mana",
    number: "05",
    asideVariant: "disclaimer",
    alignOverride: "right",
    softOverlay: true,
    image: {
      src: images.ancestorEye,
      objectPosition: "42% center",
      mobileObjectPosition: "48% center",
      tone: "deep"
    }
  },
  {
    id: "orongo",
    number: "06",
    image: {
      src: images.orongo,
      objectPosition: "center center",
      mobileObjectPosition: "42% center",
      tone: "deep"
    }
  },
  {
    id: "zewnatrz",
    number: "07",
    image: { tone: "dark" }
  },
  {
    id: "dzisiaj",
    number: "08",
    image: {
      src: images.livingTradition,
      objectPosition: "43% center",
      mobileObjectPosition: "38% center",
      tone: "warm"
    }
  }
];

function getLocalizedChapters(language: LanguageCode): StoryChapter[] {
  const textMap = chapterTextByLanguage[language] ?? chapterTextByLanguage.pl;
  return chapterMeta.map((meta) => {
    const text = textMap[meta.id] ?? chapterTextByLanguage.pl[meta.id];
    return {
      id: meta.id,
      number: meta.number,
      eyebrow: text.eyebrow,
      title: text.title,
      quote: text.quote,
      paragraphs: text.paragraphs,
      aside: text.aside ? { ...text.aside, variant: meta.asideVariant } : undefined,
      endLine: text.endLine,
      image: { ...meta.image, alt: text.imageAlt },
      alignOverride: meta.alignOverride,
      softOverlay: meta.softOverlay
    };
  });
}

const chapterTextByLanguage: Record<LanguageCode, Record<string, StoryChapterText>> = {
  pl: {
    ocean: {
      eyebrow: "POCZĄTEK",
      title: "Najpierw był ocean",
      quote: "Dla pierwszych żeglarzy Pacyfik nie był pustką. Był drogą.",
      paragraphs: [
        "Rapa Nui leży około 3 700 kilometrów od wybrzeży kontynentalnego Chile. Na mapie wygląda jak niewielki punkt otoczony niemal bezkresną wodą. Dla ludzi, którzy dotarli tu jako pierwsi, nie istniały porty, mapy drukowane ani możliwość wezwania pomocy. Była tylko wiedza: położenie słońca i gwiazd, kierunek wiatrów i fal, lot morskich ptaków, kształt chmur oraz pamięć tras przekazywana przez kolejne pokolenia polinezyjskich nawigatorów.",
        "Około tysiąca lat temu niewielka grupa osadników ze wschodniej Polinezji osiągnęła tę samotną wulkaniczną wyspę. Nie był to przypadkowy dryf, lecz część jednego z największych przedsięwzięć żeglarskich w dziejach ludzkości - zasiedlania ogromnego obszaru Pacyfiku przez ludzi, którzy potrafili odnajdywać ląd daleko poza linią horyzontu.",
        "Tradycja ustna Rapa Nui wiąże początek wspólnoty z ariki Hotu Matu'a i ojczyzną nazywaną Hiva. Nie wszystkie elementy tej opowieści można przełożyć na współczesną mapę albo dokładną datę. Jej znaczenie jest jednak głębsze niż kronikarski zapis: przechowuje pamięć o podróży, pochodzeniu, przywództwie i chwili, w której ocean przestał być wyłącznie drogą, a stał się granicą nowego domu."
      ],
      imageAlt: "Artystyczna wizualizacja bezkresnego Pacyfiku widzianego z klifów Rapa Nui.",
      endLine: "Na końcu tej podróży nie czekało imperium. Czekała ziemia, na której wszystko trzeba było stworzyć od początku."
    },
    adaptacja: {
      eyebrow: "ADAPTACJA",
      title: "Największym monumentem było przetrwanie",
      quote: "Zanim powstały moai, trzeba było zbudować życie.",
      paragraphs: [
        "Rapa Nui nie dawała swoim mieszkańcom nieograniczonych zasobów. Izolacja oznaczała, że każdy błąd mógł mieć konsekwencje dla całej wspólnoty. Gleba była wystawiona na wiatr, okresowe niedobory wody i erozję, a ocean - choć zapewniał pożywienie - nie zawsze pozwalał bezpiecznie wypłynąć. Przetrwanie wymagało obserwacji, cierpliwości i technologii dostosowanej do miejsca.",
        "Mieszkańcy tworzyli kamienne ogrody i osłony typu manavai. Rozłożone na ziemi fragmenty skał pomagały zatrzymywać wilgoć, ograniczały wpływ wiatru i stabilizowały temperaturę wokół upraw. Kamienne kręgi chroniły rośliny, a wiedza o glebie, porach roku, wodzie, rybołówstwie i przechowywaniu żywności była równie ważna jak umiejętność rzeźbienia posągów. Krajobraz wyspy nie był więc biernym tłem. Był współtworzony przez ludzi i ich codzienną pracę.",
        "Społeczeństwo organizowało się wokół rodów i terytoriów. Genealogia określała przynależność, obowiązki i relację z ziemią. Pojęcia mana - duchowej siły i autorytetu - oraz tapu - zasad wyznaczających to, co chronione, święte lub ograniczone - porządkowały nie tylko religię, lecz także życie społeczne. Wiedza nie znajdowała się w książkach. Żyła w pamięci ludzi, w nazwach miejsc, pieśniach, opowieściach, gestach, rzemiośle i praktykach wykonywanych wspólnie.",
        "Właśnie dlatego największym osiągnięciem Rapa Nui nie była pojedyncza monumentalna figura. Był nim system życia zdolny utrzymać wspólnotę przez stulecia w jednym z najbardziej odizolowanych miejsc na Ziemi. Najnowsze badania nad dawnym rolnictwem i genomami mieszkańców dodatkowo podważają popularną opowieść o prostym, samobójczym \"ekocydzie\". Pokazują społeczeństwo mniejsze, bardziej elastyczne i odporniejsze, niż przez lata przedstawiała je zachodnia popkultura."
      ],
      imageAlt: "Artystyczna wizualizacja starszego mężczyzny przekazującego dziecku tradycję pracy ze sznurkiem inspirowaną Kai-kai.",
      endLine: "Dopiero wspólnota, która nauczyła się utrzymywać życie, mogła nadać trwałą formę pamięci o swoich przodkach."
    },
    "ahu-moai": {
      eyebrow: "AHU I MOAI",
      title: "Przodkowie pozostali wśród żywych",
      quote: "Moai nie patrzyły w bezkres. Patrzyły na swoich ludzi.",
      paragraphs: [
        "Na Rapa Nui powstało ponad trzysta ahu - kamiennych platform ceremonialnych powiązanych z rodami, pamięcią, obrzędami i pochówkami. Na wielu z nich ustawiano moai: monumentalne postacie przedstawiające przodków lub osoby o szczególnym znaczeniu. Posąg nie był dekoracją ani anonimowym \"idolem\". Łączył żyjących z genealogią, terytorium i autorytetem tych, którzy odeszli.",
        "Większość moai ustawionych na ahu odwracała się plecami do oceanu i kierowała twarz ku osadom, domom oraz ziemi uprawianej przez potomków. Ich obecność mówiła: przodkowie nadal są częścią wspólnoty. Czuwają nad miejscem, z którego wyrósł ród, potwierdzają jego więź z ziemią i przypominają, że teraźniejszość nie istnieje bez pamięci.",
        "Na wyspie zinwentaryzowano niemal dziewięćset moai i ponad trzysta platform ceremonialnych. Różnią się rozmiarem, proporcjami, stopniem ukończenia i historią. Nie były produkowane jak identyczne monumenty jednego państwa. Powstawały w świecie wielu grup rodzinnych i lokalnych centrów ceremonialnych. Każda figura należała do konkretnego krajobrazu i konkretnej sieci relacji.",
        "Dlatego pytanie \"kto zbudował moai?\" ma prostą, choć często pomijaną odpowiedź: zbudowali je przodkowie dzisiejszych Rapa Nui. Nie obca cywilizacja, nie przybysze z innego kontynentu i nie mityczna technologia. Ludzie posiadający wiedzę o kamieniu, równowadze, linach, organizacji pracy i znaczeniu wspólnego celu."
      ],
      imageAlt: "Artystyczna wizualizacja zboczy Rano Raraku z moai osadzonymi w wulkanicznym krajobrazie.",
      endLine: "Moai były kamiennymi twarzami pamięci. Ich narodziny zaczynały się w jednym niezwykłym miejscu."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "Góra, z której wychodzili przodkowie",
      quote: "Najpierw twarz pojawiała się w skale. Potem całe ciało odłączano od zbocza.",
      paragraphs: [
        "Większość moai narodziła się w kamieniołomie wulkanu Rano Raraku. W miękkim tufie wulkanicznym rzeźbiarze wyznaczali kontur postaci, a następnie, używając narzędzi zwanych toki, wykonywanych z twardego bazaltu, stopniowo wydobywali z góry twarz, tors i dłonie. Figura przez długi czas pozostawała połączona plecami ze skałą. Dopiero w końcowej fazie była odcinana, opuszczana ze zbocza i przygotowywana do transportu.",
        "Rano Raraku nie jest cmentarzem porzuconych głów. Wulkan zachował niemal czterysta figur na różnych etapach pracy: niektóre nadal leżą w skalnej ścianie, inne stoją częściowo zagłębione w ziemi, kolejne zatrzymały się przy drogach prowadzących ku wybrzeżu. Razem tworzą zapis procesu technologicznego, którego żaden tekst nie opisał równie dokładnie.",
        "Najbardziej poruszające jest to, że wiele posągów nie dotarło do swoich ahu. Pozostały w miejscu, w którym przerwano pracę, albo upadły podczas drogi. Nie są dowodem nagłego zniknięcia budowniczych. Są śladami długiego okresu działalności, zmian społecznych i przedsięwzięć realizowanych przez różne pokolenia.",
        "Sposób transportu moai przez dziesięciolecia przedstawiano jako zagadkę wymagającą setek ludzi, ogromnych ilości drewna albo niemal nadludzkiej siły. Tradycja Rapa Nui zachowała jednak zdanie, że posągi \"szły\". Jedna z najlepiej rozwiniętych współczesnych hipotez zakłada, że odpowiednio wyprofilowane figury można było przesuwać pionowo, kołysząc je linami naprzemiennie w lewo i w prawo. Badania archeologiczne, modele fizyczne i eksperymenty pokazały, że taki ruch jest możliwy. Nie zamyka to całej dyskusji, ale odbiera tej historii fałszywą magię i przywraca jej coś znacznie ciekawszego: ludzką pomysłowość."
      ],
      aside: {
        title: "Jak mogły iść moai?",
        body: "Badacze nadal dyskutują o technikach transportu. Eksperymenty wykazały jednak, że moai o odpowiednim środku ciężkości można prowadzić pionowo za pomocą lin i rytmicznego kołysania - zgodnie z rapanujską tradycją mówiącą, że posągi szły."
      },
      imageAlt: "Artystyczna wizualizacja zboczy Rano Raraku z moai osadzonymi w wulkanicznym krajobrazie.",
      endLine: "Droga kończyła się na ahu. Lecz nawet ustawiony posąg nie był jeszcze w pełni żywą twarzą."
    },
    mana: {
      eyebrow: "MANA",
      title: "Dopiero oczy budziły kamień",
      quote: "Bez oczu moai był monumentalnym ciałem. Z oczami stawał się spojrzeniem przodka.",
      paragraphs: [
        "Przez długi czas świat znał moai przede wszystkim jako figury z pustymi oczodołami. Dopiero podczas prac przy Ahu Nau Nau w 1978 roku odnaleziono kompletne oko wykonane z białego koralu, uzupełnione czerwonym elementem z wulkanicznej scorii. Odkrycie pomogło zrozumieć, że znany dziś surowy wygląd posągów jest obrazem niepełnym.",
        "W tradycji Rapa Nui moai określano jako aringa ora - żywe twarze przodków. Osadzenie oczu nie było kosmetycznym wykończeniem rzeźby. Symbolicznie przywracało jej zdolność patrzenia i pozwalało, aby mana przodka oddziaływała na potomków. To właśnie spojrzenie zamykało drogę od kamieniołomu do wspólnoty: skała stawała się twarzą, twarz obecnością, a obecność częścią życia rodu.",
        "Nie wszystkie szczegóły dawnych ceremonii przetrwały. Zerwanie międzypokoleniowego przekazu w XIX wieku zabrało ogromną część wiedzy. Zachowane elementy pozwalają jednak zobaczyć moai inaczej. Nie jako milczące kolosy stojące poza czasem, lecz jako relację pomiędzy żywymi i umarłymi, ziemią i genealogią, pamięcią i odpowiedzialnością."
      ],
      aside: {
        title: "Ważna nota do obrazu",
        body: "Dostarczony asset jest artystyczną interpretacją. Widoczne oczy nie są podpisywane jako autentyczne muzealne znalezisko. Fakt historyczny o oku z Ahu Nau Nau przekazujemy w tekście."
      },
      imageAlt: "Artystyczna wizualizacja twarzy moai oraz symbolicznego motywu oczu.",
      endLine: "Z czasem język sacrum zaczął się zmieniać. Rapa Nui weszła w nową epokę - ale nie przestała być sobą."
    },
    orongo: {
      eyebrow: "ORONGO I TANGATA MANU",
      title: "Kultura zmieniła swoje symbole",
      quote: "Koniec epoki moai nie był końcem Rapa Nui.",
      paragraphs: [
        "Środowisko wyspy zmieniało się. Dawne lasy ustępowały, rosła presja na zasoby, a struktura polityczna i religijna przechodziła przemiany. Część moai została z czasem obalona, wiele ahu utraciło dawną funkcję, a centrum życia ceremonialnego przesunęło się ku Orongo - osadzie położonej na krawędzi krateru Rano Kau, wysoko nad oceanem i wysepkami Motu Nui, Motu Iti oraz Motu Kaokao.",
        "W około pięćdziesięciu niskich kamiennych domach gromadzili się okresowo przedstawiciele rodów. Z Orongo wiązała się ceremonia Tangata Manu - Człowieka-Ptaka. Wybrani przedstawiciele przywódców przeprawiali się na Motu Nui i oczekiwali na pierwsze w sezonie jajo manutara - ptaka morskiego gniazdującego na skalistej wysepce. Przywódca reprezentowany przez zdobywcę jaja otrzymywał tytuł Tangata Manu oraz szczególny autorytet w kolejnym cyklu społecznym i rytualnym.",
        "Nie była to \"dziwna konkurencja\" stworzona dla widowiska. Był to nowy sposób porządkowania władzy, sacrum i relacji między grupami w świecie, który przestał funkcjonować dokładnie tak jak w szczytowym okresie budowania moai. Liczne petroglify człowieka-ptaka, związki z Makemake i dramatyczne położenie Orongo pokazują kulturę zdolną zmieniać formy bez porzucania własnej pamięci.",
        "Do najbardziej niezwykłych świadectw Rapa Nui należą również drewniane tabliczki pokryte znakami rongorongo. Ich system nie został dotąd przekonująco odczytany. Nie należy używać tych znaków jako przypadkowej dekoracji ani udawać, że znamy ich pełne znaczenie. Są materialnym śladem wiedzy, której ciągłość została dramatycznie przerwana.",
        "Przez dużą część XX wieku historię wyspy opowiadano jako ostrzeżenie o społeczeństwie, które miało zniszczyć własne środowisko i runąć jeszcze przed przybyciem Europejczyków. Zmiany ekologiczne były realne, podobnie jak napięcia i przemiany społeczne. Jednak badania opublikowane w 2024 roku - zarówno genetyczne, jak i dotyczące skali dawnego rolnictwa - nie potwierdziły prostego scenariusza gwałtownego załamania ludności w XVII wieku. Dzisiejszy obraz jest bardziej złożony: Rapa Nui zmieniała się, mierzyła z ograniczeniami i adaptowała. Najbardziej niszczące uderzenie miało dopiero nadejść z zewnątrz."
      ],
      imageAlt: "Artystyczna wizualizacja kamiennych zabudowań Orongo na klifie nad Pacyfikiem.",
      endLine: "Wyspa przetrwała stulecia izolacji. Niemal nie przetrwała spotkania ze światem, który przybył po ludzi, ziemię i zysk."
    },
    zewnatrz: {
      eyebrow: "XVIII-XX WIEK",
      title: "Najciemniejszy rozdział przyszedł z zewnątrz",
      quote: "Tego, czego nie dokonały stulecia izolacji, niemal dokonały niewolnictwo, epidemie i kolonialna eksploatacja.",
      paragraphs: [
        "W 1722 roku do wyspy dotarła holenderska wyprawa Jacoba Roggeveena - było to pierwsze dobrze udokumentowane spotkanie mieszkańców z Europejczykami. W zachodnich kronikach przez długi czas nazywano je \"odkryciem\", choć Rapa Nui miała już własne społeczeństwo, historię, nazwy miejsc i pamięć wielu pokoleń. Dla wyspiarzy nie był to początek dziejów, lecz początek coraz bardziej niebezpiecznych kontaktów ze światem zewnętrznym.",
        "Najtragiczniejsze wydarzenia rozegrały się w latach 1862-1863. Statki handlarzy niewolników uprowadziły z Rapa Nui i innych wysp Polinezji ludzi przeznaczonych do przymusowej pracy w Peru. Według chilijskich źródeł historycznych z samej Rapa Nui mogło zostać zabranych około 1 500 osób, w tym przywódcy, kapłani i znawcy tradycji. Porwanie ludzi odpowiedzialnych za pamięć, ceremonie i przekaz wiedzy było ciosem nie tylko demograficznym, ale również kulturowym.",
        "Pod naciskiem międzynarodowym część uprowadzonych miała zostać odesłana. Na wyspę wróciła jednak zaledwie garstka, a wraz z nią choroby zakaźne, na które miejscowa ludność nie miała odporności. Epidemie, dalsze wyjazdy, przemoc i rozpad struktur społecznych doprowadziły do katastrofalnego spadku liczby mieszkańców. UNESCO podsumowuje, że niewolnictwo, choroby, kolonizacja, wprowadzenie hodowli i ograniczanie rdzennych mieszkańców do coraz mniejszych obszarów zmniejszyły społeczność do niewiele ponad stu osób.",
        "W 1888 roku przedstawiciele Chile oraz ariki Atamu Tekena i rada przywódców podpisali dokumenty znane dziś jako Porozumienie Woli. Ich interpretacja - zwłaszcza różnice między wersją hiszpańską a rapanujską oraz znaczenie przekazania suwerenności i praw do ziemi - do dziś pozostaje elementem pamięci i sporu historycznego. Od 1895 roku przez niemal sześćdziesiąt lat znaczną część wyspy oddawano w dzierżawę przedsiębiorstwu hodowlanemu, przekształcając Rapa Nui w wielką farmę owiec. Rdzenna społeczność została ograniczona przestrzennie, a dostęp do własnej ziemi podlegał obcej administracji.",
        "To właśnie w tym okresie przerwano wiele linii przekazu, rozproszono przedmioty kultury, wywieziono szczątki przodków i dzieła, a część historii zaczęli opisywać przede wszystkim cudzoziemcy. Dlatego każda współczesna opowieść o Rapa Nui powinna zachować pokorę: nie wszystko, co utracono, da się odtworzyć, a głosu żyjącej społeczności nie można zastąpić romantyczną legendą o \"tajemniczej, wymarłej wyspie\"."
      ],
      imageAlt: "",
      endLine:
        "Pozostało niewiele ponad sto osób. Wystarczająco mało, by świat uznał kulturę za ginącą. Wystarczająco dużo, by ocalić jej ciągłość."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI DZISIAJ",
      title: "Naród, który przetrwał",
      quote: "Rapa Nui nie jest ruiną. Jest domem.",
      paragraphs: [
        "Potomkowie dawnych mieszkańców nadal żyją na wyspie. Podtrzymują i rewitalizują język rapanujski, przywracają znaczenie nazwom miejsc, tworzą rzeźby, śpiewają, tańczą, opowiadają genealogie i podejmują działania na rzecz ochrony dziedzictwa. Moai nie są dla nich anonimową atrakcją archeologiczną. Są częścią krajobrazu przodków, pamięci rodowej oraz współczesnej rozmowy o tożsamości, ziemi i prawie do decydowania o własnym dziedzictwie.",
        "Jednym z pięknych przykładów żywej ciągłości jest Kai-kai. Za pomocą nici układanej pomiędzy palcami powstają figury, którym towarzyszy recytacja pāta'u-ta'u. W ten sposób można przekazywać historie, krajobrazy, wydarzenia, mitologię, genealogie i pamięć zbiorową. To, co dla przypadkowego obserwatora wygląda jak zabawa sznurkiem, jest nośnikiem języka i wielopokoleniowego doświadczenia.",
        "W 2026 roku na Rapa Nui zorganizowano festiwal figur narracyjnych Kai-kai poświęcony pamięci mistrzyni Isabel Pakarati Tepano. W wydarzeniu uczestniczyli przedstawiciele różnych pokoleń, prezentując opowieści w języku rapanujskim i hiszpańskim. Tak właśnie kultura trwa: nie jako zamrożony eksponat, lecz jako praktyka wykonywana rękami, głosem i pamięcią żyjących ludzi.",
        "Dlatego w tej sekcji nie wolno mówić o Rapa Nui wyłącznie w czasie przeszłym. Dzisiejsi mieszkańcy nie są przypisem do historii moai. Są potomkami ich twórców, opiekunami miejsc, artystami, badaczami, nauczycielami i gospodarzami wyspy. Opowieść nie kończy się wraz z ostatnim ustawionym posągiem ani z przybyciem Europejczyków. Trwa w rodzinach, języku i świadomym odzyskiwaniu własnego głosu."
      ],
      imageAlt: "Artystyczna wizualizacja starszego rzemieślnika przekazującego dziecku sztukę rzeźbienia, z moai w oddali.",
      endLine:
        "RapaNuiPark nie opowiada o cywilizacji, która zniknęła. Opowiada o narodzie, który przetrwał - i o twarzach przodków, które nadal patrzą."
    }
  },
  en: {
    ocean: {
      eyebrow: "THE BEGINNING",
      title: "First, there was the ocean",
      quote: "To the first navigators, the Pacific was not emptiness. It was a road.",
      paragraphs: [
        "Rapa Nui lies about 3,700 kilometres from the coast of continental Chile. On a map it looks like a tiny point surrounded by nearly endless water. For the people who reached it first, there were no ports, no printed charts, no way to call for help. There was only knowledge: the position of the sun and stars, the direction of winds and swells, the flight of seabirds, the shape of clouds, and route-memory passed down through generations of Polynesian navigators.",
        "About a thousand years ago, a small group of settlers from eastern Polynesia reached this lone volcanic island. It was not an accidental drift, but part of one of the greatest seafaring undertakings in human history - the settlement of a vast stretch of the Pacific by people who could find land far beyond the horizon.",
        "Rapa Nui's oral tradition ties the community's beginning to the ariki Hotu Matu'a and a homeland called Hiva. Not every element of this story can be mapped onto a modern chart or an exact date. Its meaning runs deeper than a chronicle, though: it holds the memory of a journey, of origin, of leadership, and of the moment the ocean stopped being only a road and became the border of a new home."
      ],
      imageAlt: "Artistic visualisation of the endless Pacific seen from the cliffs of Rapa Nui.",
      endLine: "No empire waited at the end of that journey. Only land, where everything had to be built from nothing."
    },
    adaptacja: {
      eyebrow: "ADAPTATION",
      title: "The greatest monument was survival",
      quote: "Before the moai, a life had to be built.",
      paragraphs: [
        "Rapa Nui did not give its people unlimited resources. Isolation meant that any mistake could have consequences for the whole community. The soil was exposed to wind, periodic water shortages and erosion, and the ocean - though it provided food - did not always allow a safe launch. Survival demanded observation, patience and technology suited to the place.",
        "People built stone gardens and manavai shelters. Rock fragments laid across the ground helped retain moisture, reduced the impact of wind and stabilised the temperature around the crops. Stone circles protected plants, and knowledge of soil, seasons, water, fishing and food storage mattered as much as the skill of carving statues. The island's landscape was not a passive backdrop, then. It was co-created by people and their daily work.",
        "Society organised itself around lineages and territories. Genealogy determined belonging, obligations and one's relationship to the land. The concepts of mana - spiritual power and authority - and tapu - the rules marking what was protected, sacred or restricted - ordered not only religion but social life as well. Knowledge did not live in books. It lived in people's memory, in place names, songs, stories, gestures, craft and practices carried out together.",
        "That is exactly why Rapa Nui's greatest achievement was not a single monumental figure. It was a way of life able to sustain a community for centuries in one of the most isolated places on Earth. Recent research into ancient farming and the genomes of the islanders further undermines the popular story of a simple, suicidal \"ecocide\". It shows a society smaller, more flexible and more resilient than Western pop culture has portrayed for years."
      ],
      imageAlt: "Artistic visualisation of an elder passing on a string-figure tradition inspired by Kai-kai to a child.",
      endLine: "Only a community that had learned to sustain life could give lasting form to the memory of its ancestors."
    },
    "ahu-moai": {
      eyebrow: "AHU AND MOAI",
      title: "The ancestors remained among the living",
      quote: "The moai did not look out at the void. They looked at their people.",
      paragraphs: [
        "More than three hundred ahu were built on Rapa Nui - stone ceremonial platforms tied to lineages, memory, rites and burials. Moai were raised on many of them: monumental figures representing ancestors or people of particular significance. A statue was not decoration, nor an anonymous \"idol\". It bound the living to genealogy, territory and the authority of those who had passed.",
        "Most moai placed on ahu turned their backs to the ocean and faced the settlements, the homes and the land worked by their descendants. Their presence said: the ancestors are still part of the community. They watch over the place their lineage grew from, confirm its bond with the land, and remind the living that the present does not exist without memory.",
        "Nearly nine hundred moai and more than three hundred ceremonial platforms have been catalogued on the island. They differ in size, proportion, degree of completion and history. They were not produced like identical monuments of a single state. They arose in a world of many family groups and local ceremonial centres. Each figure belonged to a specific landscape and a specific web of relationships.",
        "That is why the question \"who built the moai?\" has a simple, if often overlooked, answer: the ancestors of today's Rapa Nui people built them. Not a foreign civilisation, not visitors from another continent, not some mythical technology. People who possessed knowledge of stone, balance, rope, work organisation and the meaning of a shared goal."
      ],
      imageAlt: "Artistic visualisation of the slopes of Rano Raraku with moai set in the volcanic landscape.",
      endLine: "The moai were memory's stone faces. Their birth began in one extraordinary place."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "The mountain the ancestors emerged from",
      quote: "First a face appeared in the rock. Then the whole body was freed from the slope.",
      paragraphs: [
        "Most moai were born in the quarry of the Rano Raraku volcano. In the soft volcanic tuff, carvers traced the outline of a figure, then, using tools called toki made of hard basalt, gradually drew a face, torso and hands out of the mountain. For a long time the figure stayed joined to the rock by its back. Only in the final phase was it cut free, lowered from the slope and prepared for transport.",
        "Rano Raraku is not a graveyard of abandoned heads. The volcano has preserved almost four hundred figures at various stages of work: some still lie in the rock face, others stand partly sunk into the ground, still others came to rest along the roads leading to the coast. Together they form a record of a technological process that no text has described as precisely.",
        "What is most moving is that many statues never reached their ahu. They remained where the work was interrupted, or fell along the way. They are not evidence of the builders suddenly vanishing. They are traces of a long period of activity, of social change, and of undertakings carried out across different generations.",
        "For decades, the way moai were transported was presented as a puzzle requiring hundreds of people, enormous quantities of timber, or almost superhuman strength. Rapa Nui tradition, however, has kept the saying that the statues \"walked\". One of the best-developed contemporary hypotheses holds that properly shaped figures could be moved upright, rocked forward by ropes pulled alternately left and right. Archaeological research, physical models and experiments have shown that such movement is possible. It does not close the whole discussion, but it strips this story of false magic and gives it back something far more interesting: human ingenuity."
      ],
      aside: {
        title: "How could the moai have walked?",
        body: "Researchers still debate the transport techniques. Experiments have shown, however, that a moai with the right centre of gravity can be walked upright using ropes and rhythmic rocking - in keeping with Rapa Nui tradition, which says the statues walked."
      },
      imageAlt: "Artistic visualisation of the slopes of Rano Raraku with moai set in the volcanic landscape.",
      endLine: "The road ended at the ahu. But even a statue once raised was not yet a fully living face."
    },
    mana: {
      eyebrow: "MANA",
      title: "Only the eyes woke the stone",
      quote: "Without eyes, a moai was a monumental body. With eyes, it became an ancestor's gaze.",
      paragraphs: [
        "For a long time the world knew moai mainly as figures with empty eye sockets. Only during work at Ahu Nau Nau in 1978 was a complete eye found, made of white coral and finished with a red element of volcanic scoria. The discovery helped make clear that the stern look the statues carry today is an incomplete picture.",
        "In Rapa Nui tradition, moai were called aringa ora - living faces of the ancestors. Setting the eyes in place was not a cosmetic finishing touch. Symbolically, it restored the statue's ability to see and allowed an ancestor's mana to act upon their descendants. It was precisely that gaze that closed the road from quarry to community: stone became a face, a face became a presence, and a presence became part of the lineage's life.",
        "Not every detail of the old ceremonies survived. The break in intergenerational transmission in the 19th century took an enormous share of that knowledge with it. What remains, though, lets us see the moai differently - not as silent colossi standing outside of time, but as a relationship between the living and the dead, land and genealogy, memory and responsibility."
      ],
      aside: {
        title: "An important note on this image",
        body: "The supplied asset is an artistic interpretation. The eyes shown are not presented as an authentic museum find. The historical fact of the eye from Ahu Nau Nau is conveyed in the text."
      },
      imageAlt: "Artistic visualisation of a moai's face and the symbolic motif of the eyes.",
      endLine: "In time, the language of the sacred began to change. Rapa Nui entered a new era - but it did not stop being itself."
    },
    orongo: {
      eyebrow: "ORONGO AND TANGATA MANU",
      title: "The culture changed its symbols",
      quote: "The end of the moai era was not the end of Rapa Nui.",
      paragraphs: [
        "The island's environment was changing. The old forests were receding, pressure on resources was growing, and the political and religious structure was going through change. Some moai were toppled over time, many ahu lost their former function, and the centre of ceremonial life shifted toward Orongo - a settlement on the rim of the Rano Kau crater, high above the ocean and the islets of Motu Nui, Motu Iti and Motu Kaokao.",
        "In around fifty low stone houses, representatives of the lineages gathered periodically. Orongo was tied to the Tangata Manu ceremony - the Birdman. Chosen representatives of the leaders crossed to Motu Nui and waited for the season's first manutara egg - a seabird nesting on the rocky islet. The leader represented by the man who found the egg received the title of Tangata Manu and special authority for the coming social and ritual cycle.",
        "This was not a \"strange contest\" staged for spectacle. It was a new way of ordering power, the sacred, and relations between groups in a world that had stopped functioning exactly as it had at the height of moai-building. Numerous birdman petroglyphs, the ties to Makemake and Orongo's dramatic setting show a culture able to change its forms without abandoning its own memory.",
        "Among Rapa Nui's most remarkable testimonies are also the wooden tablets covered in rongorongo script. Its system has not yet been convincingly deciphered. These signs should not be used as random decoration, nor should we pretend to know their full meaning. They are a material trace of knowledge whose continuity was dramatically cut short.",
        "For much of the 20th century, the island's history was told as a warning about a society said to have destroyed its own environment and collapsed even before the Europeans arrived. Ecological change was real, as were social tensions and transformation. But research published in 2024 - both genetic and on the scale of ancient agriculture - did not confirm a simple scenario of a sudden 17th-century population collapse. Today's picture is more complex: Rapa Nui was changing, contending with limits, and adapting. The most destructive blow was yet to come, from outside."
      ],
      imageAlt: "Artistic visualisation of the stone dwellings of Orongo on a cliff above the Pacific.",
      endLine: "The island survived centuries of isolation. It almost did not survive its encounter with a world that came for people, land and profit."
    },
    zewnatrz: {
      eyebrow: "18TH-20TH CENTURY",
      title: "The darkest chapter came from outside",
      quote: "What centuries of isolation had not achieved, slavery, epidemics and colonial exploitation very nearly did.",
      paragraphs: [
        "In 1722, a Dutch expedition led by Jacob Roggeveen reached the island - the first well-documented encounter between the islanders and Europeans. Western chronicles long called it a \"discovery\", though Rapa Nui already had its own society, history, place names and the memory of many generations. For the islanders, it was not the beginning of history, but the start of increasingly dangerous contact with the outside world.",
        "The most tragic events unfolded in 1862-1863. Slave-trading ships abducted people from Rapa Nui and other Polynesian islands for forced labour in Peru. According to Chilean historical sources, around 1,500 people may have been taken from Rapa Nui alone, including leaders, priests and keepers of tradition. Seizing the people responsible for memory, ceremony and the transmission of knowledge was a blow that struck not only demographically, but culturally.",
        "Under international pressure, some of the abducted were meant to be sent back. Only a handful returned to the island, however, and with them came infectious diseases the local population had no resistance to. Epidemics, further departures, violence and the collapse of social structures led to a catastrophic fall in population. UNESCO's summary is that slavery, disease, colonisation, the introduction of livestock farming, and the confinement of the indigenous population to ever-smaller areas reduced the community to little more than a hundred people.",
        "In 1888, representatives of Chile and the ariki Atamu Tekena, together with a council of leaders, signed the documents known today as the Agreement of Wills. Their interpretation - especially the differences between the Spanish and Rapa Nui versions, and the meaning of the transfer of sovereignty and land rights - remains to this day a matter of memory and historical dispute. From 1895, for nearly sixty years, a large part of the island was leased to a livestock company, turning Rapa Nui into a vast sheep farm. The indigenous community was confined spatially, and access to its own land was subject to foreign administration.",
        "It was in this period that many lines of transmission were broken, cultural objects were scattered, ancestral remains and works were taken away, and part of the island's history came to be written above all by foreigners. That is why every contemporary account of Rapa Nui should keep its humility: not everything that was lost can be recovered, and the voice of the living community cannot be replaced by a romantic legend of a \"mysterious, vanished island\"."
      ],
      imageAlt: "",
      endLine:
        "A little over a hundred people remained. Few enough for the world to call the culture dying. Enough to save its continuity."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI TODAY",
      title: "The nation that survived",
      quote: "Rapa Nui is not a ruin. It is a home.",
      paragraphs: [
        "The descendants of the island's earlier inhabitants still live there. They sustain and revive the Rapanui language, restore meaning to place names, carve, sing, dance, recount genealogies and take action to protect their heritage. To them, the moai are not an anonymous archaeological attraction. They are part of the ancestors' landscape, of lineage memory, and of a present-day conversation about identity, land and the right to decide one's own heritage.",
        "One beautiful example of living continuity is Kai-kai. Using string looped between the fingers, figures are formed accompanied by the recitation of pāta'u-ta'u. In this way, stories, landscapes, events, mythology, genealogies and collective memory can be passed on. What looks to a casual observer like play with string is a vessel for language and generations of experience.",
        "In 2026, Rapa Nui hosted a Kai-kai narrative-figures festival dedicated to the memory of the master practitioner Isabel Pakarati Tepano. Representatives of different generations took part, presenting stories in Rapanui and Spanish. This is exactly how a culture endures: not as a frozen exhibit, but as a practice carried out by the hands, voice and memory of living people.",
        "That is why this section must not speak of Rapa Nui only in the past tense. Today's islanders are not a footnote to the story of the moai. They are the descendants of their makers, the custodians of these places, artists, researchers, teachers and hosts of the island. The story does not end with the last statue raised, nor with the arrival of the Europeans. It continues in families, in language, and in the conscious reclaiming of their own voice."
      ],
      imageAlt: "Artistic visualisation of an elder craftsman passing on the art of carving to a child, with moai in the distance.",
      endLine:
        "RapaNuiPark does not tell the story of a civilisation that vanished. It tells the story of a nation that survived - and of the ancestors' faces, which still watch."
    }
  },
  fr: {
    ocean: {
      eyebrow: "LE COMMENCEMENT",
      title: "D'abord, il y eut l'océan",
      quote: "Pour les premiers navigateurs, le Pacifique n'était pas un vide. C'était une route.",
      paragraphs: [
        "Rapa Nui se trouve à environ 3 700 kilomètres des côtes du Chili continental. Sur une carte, elle ressemble à un minuscule point cerné d'une eau presque infinie. Pour ceux qui l'atteignirent les premiers, il n'existait ni ports, ni cartes imprimées, ni moyen d'appeler à l'aide. Il n'y avait que le savoir : la position du soleil et des étoiles, la direction des vents et des houles, le vol des oiseaux marins, la forme des nuages, et la mémoire des routes transmise de génération en génération par les navigateurs polynésiens.",
        "Il y a environ mille ans, un petit groupe de colons venus de Polynésie orientale atteignit cette île volcanique solitaire. Ce ne fut pas une dérive accidentelle, mais un fragment de l'une des plus grandes entreprises maritimes de l'histoire humaine - le peuplement d'une vaste étendue du Pacifique par des hommes capables de retrouver une terre bien au-delà de l'horizon.",
        "La tradition orale de Rapa Nui relie le début de la communauté à l'ariki Hotu Matu'a et à une patrie appelée Hiva. Tous les éléments de ce récit ne peuvent pas être reportés sur une carte moderne ni datés avec précision. Mais son sens dépasse la chronique : il conserve la mémoire d'un voyage, d'une origine, d'un commandement, et de l'instant où l'océan a cessé d'être seulement une route pour devenir la frontière d'une nouvelle demeure."
      ],
      imageAlt: "Visualisation artistique du Pacifique infini vu depuis les falaises de Rapa Nui.",
      endLine: "Au bout de ce voyage n'attendait aucun empire. Attendait une terre où tout restait à créer depuis le début."
    },
    adaptacja: {
      eyebrow: "ADAPTATION",
      title: "Le plus grand monument fut la survie",
      quote: "Avant les moai, il fallait bâtir une vie.",
      paragraphs: [
        "Rapa Nui n'offrait pas à ses habitants des ressources illimitées. L'isolement signifiait que la moindre erreur pouvait avoir des conséquences pour toute la communauté. Le sol était exposé au vent, à des pénuries d'eau périodiques et à l'érosion, et l'océan - s'il nourrissait - ne permettait pas toujours de prendre la mer en sécurité. Survivre exigeait de l'observation, de la patience et une technologie adaptée au lieu.",
        "Les habitants créaient des jardins de pierres et des abris appelés manavai. Des fragments de roche disposés au sol retenaient l'humidité, limitaient l'effet du vent et stabilisaient la température autour des cultures. Des cercles de pierre protégeaient les plantes, et la connaissance du sol, des saisons, de l'eau, de la pêche et de la conservation des aliments comptait autant que l'art de sculpter des statues. Le paysage de l'île n'était donc pas un simple décor passif. Il était co-créé par les hommes et leur travail quotidien.",
        "La société s'organisait autour des lignages et des territoires. La généalogie déterminait l'appartenance, les obligations et le lien à la terre. Les notions de mana - la force spirituelle et l'autorité - et de tapu - les règles désignant ce qui est protégé, sacré ou restreint - ordonnaient non seulement la religion, mais aussi la vie sociale. Le savoir ne se trouvait pas dans des livres. Il vivait dans la mémoire des gens, dans les noms de lieux, les chants, les récits, les gestes, l'artisanat et les pratiques accomplies ensemble.",
        "C'est précisément pour cela que le plus grand accomplissement de Rapa Nui ne fut pas une seule figure monumentale. Ce fut un système de vie capable de maintenir une communauté pendant des siècles dans l'un des lieux les plus isolés de la Terre. Les recherches récentes sur l'agriculture ancienne et les génomes des habitants remettent en outre en question le récit populaire d'un simple « écocide » suicidaire. Elles montrent une société plus petite, plus souple et plus résiliente que ce que la culture populaire occidentale a longtemps présenté."
      ],
      imageAlt: "Visualisation artistique d'un homme âgé transmettant à un enfant une tradition de jeux de ficelle inspirée du Kai-kai.",
      endLine: "Seule une communauté ayant appris à préserver la vie pouvait donner une forme durable à la mémoire de ses ancêtres."
    },
    "ahu-moai": {
      eyebrow: "AHU ET MOAI",
      title: "Les ancêtres sont restés parmi les vivants",
      quote: "Les moai ne regardaient pas l'immensité. Ils regardaient leur peuple.",
      paragraphs: [
        "Plus de trois cents ahu furent érigés à Rapa Nui - des plateformes cérémonielles de pierre liées aux lignages, à la mémoire, aux rites et aux sépultures. Sur beaucoup d'entre elles se dressaient des moai : des figures monumentales représentant des ancêtres ou des personnes d'une importance particulière. Une statue n'était ni un ornement ni une « idole » anonyme. Elle reliait les vivants à la généalogie, au territoire et à l'autorité de ceux qui étaient partis.",
        "La plupart des moai dressés sur les ahu tournaient le dos à l'océan et faisaient face aux villages, aux maisons et à la terre cultivée par leurs descendants. Leur présence disait : les ancêtres font toujours partie de la communauté. Ils veillent sur le lieu d'où le lignage est né, confirment son lien avec la terre et rappellent que le présent n'existe pas sans la mémoire.",
        "Près de neuf cents moai et plus de trois cents plateformes cérémonielles ont été recensés sur l'île. Ils diffèrent par la taille, les proportions, le degré d'achèvement et l'histoire. Ils n'étaient pas produits comme des monuments identiques d'un seul État. Ils naissaient dans un monde de nombreux groupes familiaux et de centres cérémoniels locaux. Chaque figure appartenait à un paysage précis et à un réseau précis de relations.",
        "C'est pourquoi la question « qui a construit les moai ? » a une réponse simple, quoique souvent négligée : ce sont les ancêtres des Rapa Nui d'aujourd'hui qui les ont construits. Ni une civilisation étrangère, ni des visiteurs venus d'un autre continent, ni une quelconque technologie mythique. Des hommes possédant un savoir sur la pierre, l'équilibre, les cordages, l'organisation du travail et le sens d'un objectif commun."
      ],
      imageAlt: "Visualisation artistique des pentes du Rano Raraku avec des moai intégrés au paysage volcanique.",
      endLine: "Les moai étaient les visages de pierre de la mémoire. Leur naissance commençait en un lieu extraordinaire."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "La montagne d'où sortaient les ancêtres",
      quote: "D'abord un visage apparaissait dans la roche. Puis tout le corps était détaché de la pente.",
      paragraphs: [
        "La plupart des moai naquirent dans la carrière du volcan Rano Raraku. Dans le tuf volcanique tendre, les sculpteurs traçaient le contour d'une figure, puis, à l'aide d'outils appelés toki, taillés dans un basalte dur, ils dégageaient peu à peu de la montagne un visage, un torse et des mains. La figure restait longtemps reliée à la roche par le dos. Ce n'est qu'à la phase finale qu'elle était détachée, descendue de la pente et préparée pour le transport.",
        "Rano Raraku n'est pas un cimetière de têtes abandonnées. Le volcan a conservé près de quatre cents figures à divers stades de travail : certaines demeurent encore dans la paroi rocheuse, d'autres se dressent partiellement enfoncées dans le sol, d'autres encore se sont arrêtées le long des chemins menant vers la côte. Ensemble, elles composent le témoignage d'un processus technologique qu'aucun texte n'a décrit aussi précisément.",
        "Le plus émouvant est que de nombreuses statues n'atteignirent jamais leur ahu. Elles restèrent là où le travail fut interrompu, ou tombèrent en chemin. Elles ne sont pas la preuve d'une disparition soudaine des bâtisseurs. Elles sont les traces d'une longue période d'activité, de changements sociaux et d'entreprises menées par des générations différentes.",
        "Pendant des décennies, le mode de transport des moai fut présenté comme une énigme exigeant des centaines d'hommes, d'énormes quantités de bois ou une force presque surhumaine. La tradition de Rapa Nui a pourtant conservé l'idée que les statues « marchaient ». L'une des hypothèses contemporaines les mieux développées suppose que des figures correctement profilées pouvaient être déplacées à la verticale, en les balançant à l'aide de cordes tirées alternativement à gauche et à droite. Des recherches archéologiques, des modèles physiques et des expériences ont montré qu'un tel mouvement est possible. Cela ne clôt pas toute la discussion, mais retire à cette histoire sa magie factice et lui restitue quelque chose de bien plus intéressant : l'ingéniosité humaine."
      ],
      aside: {
        title: "Comment les moai auraient-ils pu marcher ?",
        body: "Les chercheurs débattent encore des techniques de transport. Des expériences ont toutefois montré qu'un moai au centre de gravité approprié peut être conduit à la verticale au moyen de cordes et d'un balancement rythmique - conformément à la tradition de Rapa Nui, selon laquelle les statues marchaient."
      },
      imageAlt: "Visualisation artistique des pentes du Rano Raraku avec des moai intégrés au paysage volcanique.",
      endLine: "Le chemin s'achevait sur l'ahu. Mais même dressée, la statue n'était pas encore pleinement un visage vivant."
    },
    mana: {
      eyebrow: "MANA",
      title: "Seuls les yeux ont réveillé la pierre",
      quote: "Sans yeux, le moai était un corps monumental. Avec des yeux, il devenait le regard d'un ancêtre.",
      paragraphs: [
        "Pendant longtemps, le monde n'a connu les moai que comme des figures aux orbites vides. Ce n'est que lors de travaux à Ahu Nau Nau, en 1978, qu'un œil complet fut retrouvé, fait de corail blanc et complété d'un élément rouge en scorie volcanique. Cette découverte a permis de comprendre que l'apparence austère que l'on connaît aujourd'hui aux statues est une image incomplète.",
        "Dans la tradition de Rapa Nui, les moai étaient appelés aringa ora - visages vivants des ancêtres. La pose des yeux n'était pas une simple finition esthétique de la sculpture. Elle restituait symboliquement à la statue sa capacité de voir et permettait au mana de l'ancêtre d'agir sur ses descendants. C'est précisément ce regard qui achevait le chemin depuis la carrière jusqu'à la communauté : la roche devenait un visage, le visage devenait une présence, et la présence faisait partie de la vie du lignage.",
        "Tous les détails des anciennes cérémonies n'ont pas survécu. La rupture de la transmission intergénérationnelle au XIXe siècle a emporté une immense part de ce savoir. Ce qui en subsiste permet néanmoins de voir les moai autrement - non comme des colosses silencieux hors du temps, mais comme une relation entre les vivants et les morts, la terre et la généalogie, la mémoire et la responsabilité."
      ],
      aside: {
        title: "Note importante sur l'image",
        body: "L'image fournie est une interprétation artistique. Les yeux visibles ne sont pas présentés comme une découverte muséale authentique. Le fait historique concernant l'œil d'Ahu Nau Nau est rapporté dans le texte."
      },
      imageAlt: "Visualisation artistique du visage d'un moai et du motif symbolique des yeux.",
      endLine: "Avec le temps, le langage du sacré a commencé à changer. Rapa Nui est entrée dans une nouvelle époque - sans cesser d'être elle-même."
    },
    orongo: {
      eyebrow: "ORONGO ET TANGATA MANU",
      title: "La culture a changé de symboles",
      quote: "La fin de l'ère des moai ne fut pas la fin de Rapa Nui.",
      paragraphs: [
        "L'environnement de l'île se transformait. Les anciennes forêts reculaient, la pression sur les ressources augmentait, et la structure politique et religieuse connaissait des mutations. Certains moai furent renversés au fil du temps, de nombreux ahu perdirent leur ancienne fonction, et le centre de la vie cérémonielle se déplaça vers Orongo - un village situé au bord du cratère du Rano Kau, haut au-dessus de l'océan et des îlots de Motu Nui, Motu Iti et Motu Kaokao.",
        "Dans une cinquantaine de basses maisons de pierre se réunissaient périodiquement des représentants des lignages. Orongo était liée à la cérémonie du Tangata Manu - l'Homme-Oiseau. Des représentants choisis par les chefs traversaient jusqu'à Motu Nui et attendaient le premier œuf de manutara de la saison - un oiseau marin nichant sur cet îlot rocheux. Le chef représenté par celui qui trouvait l'œuf recevait le titre de Tangata Manu et une autorité particulière pour le cycle social et rituel suivant.",
        "Il ne s'agissait pas d'une « étrange compétition » créée pour le spectacle. C'était une nouvelle manière d'ordonner le pouvoir, le sacré et les relations entre groupes, dans un monde qui avait cessé de fonctionner exactement comme à l'apogée de la construction des moai. Les nombreux pétroglyphes de l'homme-oiseau, les liens avec Makemake et le cadre spectaculaire d'Orongo montrent une culture capable de changer de formes sans abandonner sa propre mémoire.",
        "Parmi les témoignages les plus remarquables de Rapa Nui figurent aussi les tablettes de bois couvertes de signes rongorongo. Leur système n'a pas encore été déchiffré de façon convaincante. Il ne faut pas utiliser ces signes comme une simple décoration, ni prétendre en connaître le sens complet. Ce sont des traces matérielles d'un savoir dont la continuité fut brutalement rompue.",
        "Pendant une grande partie du XXe siècle, l'histoire de l'île fut racontée comme un avertissement, celui d'une société censée avoir détruit son propre environnement et s'être effondrée avant même l'arrivée des Européens. Les changements écologiques furent réels, tout comme les tensions et les mutations sociales. Mais les recherches publiées en 2024 - tant génétiques que portant sur l'ampleur de l'agriculture ancienne - n'ont pas confirmé un scénario simple d'effondrement brutal de la population au XVIIe siècle. L'image actuelle est plus complexe : Rapa Nui se transformait, affrontait des limites et s'adaptait. Le coup le plus destructeur restait encore à venir, et il viendrait de l'extérieur."
      ],
      imageAlt: "Visualisation artistique des habitations de pierre d'Orongo sur une falaise dominant le Pacifique.",
      endLine: "L'île a survécu à des siècles d'isolement. Elle n'a presque pas survécu à sa rencontre avec un monde venu chercher des hommes, une terre et du profit."
    },
    zewnatrz: {
      eyebrow: "XVIIIE-XXE SIÈCLE",
      title: "Le chapitre le plus sombre est venu de l'extérieur",
      quote: "Ce que des siècles d'isolement n'avaient pas accompli, l'esclavage, les épidémies et l'exploitation coloniale l'ont presque accompli.",
      paragraphs: [
        "En 1722, l'expédition hollandaise de Jacob Roggeveen atteignit l'île - ce fut la première rencontre bien documentée entre les habitants et des Européens. Les chroniques occidentales l'ont longtemps qualifiée de « découverte », bien que Rapa Nui possédât déjà sa propre société, sa propre histoire, ses noms de lieux et la mémoire de nombreuses générations. Pour les insulaires, ce ne fut pas le commencement de leur histoire, mais le début de contacts de plus en plus dangereux avec le monde extérieur.",
        "Les événements les plus tragiques se déroulèrent entre 1862 et 1863. Des navires de négriers enlevèrent, depuis Rapa Nui et d'autres îles de Polynésie, des personnes destinées au travail forcé au Pérou. Selon des sources historiques chiliennes, environ 1 500 personnes auraient pu être emmenées de Rapa Nui même, parmi lesquelles des chefs, des prêtres et des connaisseurs de la tradition. L'enlèvement des personnes responsables de la mémoire, des cérémonies et de la transmission du savoir fut un coup non seulement démographique, mais aussi culturel.",
        "Sous la pression internationale, une partie des personnes enlevées devait être renvoyée. Seule une poignée revint cependant sur l'île, apportant avec elle des maladies infectieuses auxquelles la population locale n'avait aucune résistance. Les épidémies, les nouveaux départs, la violence et l'effondrement des structures sociales conduisirent à une chute catastrophique du nombre d'habitants. L'UNESCO résume que l'esclavage, les maladies, la colonisation, l'introduction de l'élevage et le confinement des populations autochtones dans des espaces toujours plus restreints réduisirent la communauté à un peu plus d'une centaine de personnes.",
        "En 1888, des représentants du Chili ainsi que l'ariki Atamu Tekena et le conseil des chefs signèrent les documents connus aujourd'hui sous le nom d'Accord de Volontés. Leur interprétation - en particulier les différences entre la version espagnole et la version rapanui, ainsi que la portée du transfert de souveraineté et des droits sur la terre - demeure aujourd'hui encore un objet de mémoire et de controverse historique. À partir de 1895, pendant près de soixante ans, une grande partie de l'île fut donnée en location à une entreprise d'élevage, transformant Rapa Nui en un vaste élevage de moutons. La communauté autochtone fut confinée dans l'espace, et l'accès à sa propre terre soumis à une administration étrangère.",
        "C'est précisément durant cette période que de nombreuses lignes de transmission furent rompues, que des objets culturels furent dispersés, que des restes d'ancêtres et des œuvres furent emportés, et qu'une part de l'histoire de l'île se mit à être écrite surtout par des étrangers. C'est pourquoi tout récit contemporain sur Rapa Nui doit garder son humilité : tout ce qui a été perdu ne peut être restitué, et la voix de la communauté vivante ne saurait être remplacée par une légende romantique d'« île mystérieuse et disparue »."
      ],
      imageAlt: "",
      endLine:
        "Il ne restait qu'un peu plus d'une centaine de personnes. Assez peu pour que le monde juge la culture mourante. Assez pour en sauver la continuité."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI AUJOURD'HUI",
      title: "Le peuple qui a survécu",
      quote: "Rapa Nui n'est pas une ruine. C'est une demeure.",
      paragraphs: [
        "Les descendants des anciens habitants vivent encore sur l'île. Ils maintiennent et font revivre la langue rapanui, redonnent leur sens aux noms de lieux, sculptent, chantent, dansent, racontent les généalogies et agissent pour protéger leur patrimoine. Les moai ne sont pas pour eux une attraction archéologique anonyme. Ils font partie du paysage des ancêtres, de la mémoire du lignage, et d'un dialogue contemporain sur l'identité, la terre et le droit de décider de son propre patrimoine.",
        "Le Kai-kai est l'un des plus beaux exemples de cette continuité vivante. À l'aide d'un fil disposé entre les doigts naissent des figures accompagnées de la récitation du pāta'u-ta'u. On peut ainsi transmettre des récits, des paysages, des événements, une mythologie, des généalogies et une mémoire collective. Ce qui, pour un observateur de passage, ressemble à un jeu de ficelle, est en réalité le vecteur d'une langue et d'une expérience transmise sur plusieurs générations.",
        "En 2026, Rapa Nui a organisé un festival des figures narratives Kai-kai dédié à la mémoire de la maîtresse Isabel Pakarati Tepano. Des représentants de générations différentes y ont participé, présentant des récits en rapanui et en espagnol. C'est exactement ainsi que la culture perdure : non comme un objet figé, mais comme une pratique accomplie par les mains, la voix et la mémoire des vivants.",
        "C'est pourquoi cette section ne doit pas parler de Rapa Nui uniquement au passé. Les habitants d'aujourd'hui ne sont pas une note de bas de page dans l'histoire des moai. Ils sont les descendants de leurs créateurs, les gardiens des lieux, des artistes, des chercheurs, des enseignants et les hôtes de l'île. Le récit ne s'achève ni avec la dernière statue dressée, ni avec l'arrivée des Européens. Il se poursuit dans les familles, dans la langue, et dans la reconquête consciente de leur propre voix."
      ],
      imageAlt: "Visualisation artistique d'un artisan âgé transmettant à un enfant l'art de la sculpture, avec des moai au loin.",
      endLine:
        "RapaNuiPark ne raconte pas l'histoire d'une civilisation disparue. Il raconte l'histoire d'un peuple qui a survécu - et des visages des ancêtres, qui regardent encore."
    }
  },
  es: {
    ocean: {
      eyebrow: "EL COMIENZO",
      title: "Primero fue el océano",
      quote: "Para los primeros navegantes, el Pacífico no era un vacío. Era un camino.",
      paragraphs: [
        "Rapa Nui se encuentra a unos 3.700 kilómetros de las costas de Chile continental. En un mapa parece un punto diminuto rodeado de un agua casi infinita. Para quienes llegaron primero no existían puertos, ni cartas impresas, ni forma de pedir ayuda. Solo había conocimiento: la posición del sol y las estrellas, la dirección de los vientos y del oleaje, el vuelo de las aves marinas, la forma de las nubes y la memoria de las rutas transmitida por generaciones de navegantes polinesios.",
        "Hace aproximadamente mil años, un pequeño grupo de colonos de la Polinesia oriental alcanzó esta solitaria isla volcánica. No fue una deriva accidental, sino parte de una de las mayores empresas marítimas de la historia de la humanidad: el poblamiento de una vasta extensión del Pacífico por gente capaz de encontrar tierra mucho más allá del horizonte.",
        "La tradición oral de Rapa Nui vincula el origen de la comunidad con el ariki Hotu Matu'a y una patria llamada Hiva. No todos los elementos de este relato pueden trasladarse a un mapa moderno ni a una fecha exacta. Pero su significado es más profundo que una crónica: guarda la memoria de un viaje, de un origen, de un liderazgo y del momento en que el océano dejó de ser solo un camino para convertirse en la frontera de un nuevo hogar."
      ],
      imageAlt: "Visualización artística del infinito Pacífico visto desde los acantilados de Rapa Nui.",
      endLine: "Al final de ese viaje no esperaba ningún imperio. Esperaba una tierra donde todo había que crearlo desde el principio."
    },
    adaptacja: {
      eyebrow: "ADAPTACIÓN",
      title: "El mayor monumento fue la supervivencia",
      quote: "Antes de los moáis, había que construir una vida.",
      paragraphs: [
        "Rapa Nui no ofrecía a sus habitantes recursos ilimitados. El aislamiento significaba que cualquier error podía tener consecuencias para toda la comunidad. El suelo estaba expuesto al viento, a escaseces periódicas de agua y a la erosión, y el océano - aunque proporcionaba alimento - no siempre permitía hacerse a la mar con seguridad. Sobrevivir exigía observación, paciencia y una tecnología adaptada al lugar.",
        "Los habitantes crearon jardines de piedra y refugios llamados manavai. Fragmentos de roca dispuestos sobre el suelo ayudaban a retener la humedad, reducían el efecto del viento y estabilizaban la temperatura alrededor de los cultivos. Los círculos de piedra protegían las plantas, y el conocimiento del suelo, las estaciones, el agua, la pesca y la conservación de alimentos era tan importante como la habilidad para esculpir estatuas. El paisaje de la isla no era, por tanto, un telón de fondo pasivo. Era co-creado por las personas y su trabajo cotidiano.",
        "La sociedad se organizaba en torno a linajes y territorios. La genealogía determinaba la pertenencia, las obligaciones y la relación con la tierra. Los conceptos de mana - la fuerza espiritual y la autoridad - y tapu - las normas que señalaban lo protegido, lo sagrado o lo restringido - ordenaban no solo la religión, sino también la vida social. El conocimiento no residía en libros. Vivía en la memoria de las personas, en los nombres de los lugares, en los cantos, los relatos, los gestos, el artesanado y las prácticas realizadas en común.",
        "Por eso, el mayor logro de Rapa Nui no fue una sola figura monumental. Fue un sistema de vida capaz de sostener a una comunidad durante siglos en uno de los lugares más aislados de la Tierra. Las investigaciones recientes sobre la agricultura antigua y los genomas de sus habitantes cuestionan además el relato popular de un simple «ecocidio» suicida. Muestran una sociedad más pequeña, más flexible y más resiliente de lo que la cultura popular occidental ha presentado durante años."
      ],
      imageAlt: "Visualización artística de un anciano transmitiendo a un niño una tradición de figuras de hilo inspirada en el Kai-kai.",
      endLine: "Solo una comunidad que había aprendido a sostener la vida pudo dar una forma perdurable a la memoria de sus antepasados."
    },
    "ahu-moai": {
      eyebrow: "AHU Y MOÁI",
      title: "Los ancestros permanecieron entre los vivos",
      quote: "Los moáis no miraban hacia la inmensidad. Miraban a su gente.",
      paragraphs: [
        "En Rapa Nui se construyeron más de trescientos ahu - plataformas ceremoniales de piedra ligadas a los linajes, la memoria, los ritos y los enterramientos. Sobre muchas de ellas se erigían moáis: figuras monumentales que representaban a ancestros o a personas de especial relevancia. Una estatua no era una decoración ni un «ídolo» anónimo. Unía a los vivos con la genealogía, el territorio y la autoridad de quienes se habían ido.",
        "La mayoría de los moáis colocados sobre los ahu daban la espalda al océano y dirigían el rostro hacia los asentamientos, las viviendas y la tierra cultivada por sus descendientes. Su presencia decía: los ancestros siguen siendo parte de la comunidad. Velan por el lugar del que surgió el linaje, confirman su vínculo con la tierra y recuerdan que el presente no existe sin la memoria.",
        "En la isla se han catalogado casi novecientos moáis y más de trescientas plataformas ceremoniales. Difieren en tamaño, proporciones, grado de finalización e historia. No se producían como monumentos idénticos de un único estado. Surgían en un mundo de numerosos grupos familiares y centros ceremoniales locales. Cada figura pertenecía a un paisaje concreto y a una red concreta de relaciones.",
        "Por eso la pregunta «¿quién construyó los moáis?» tiene una respuesta sencilla, aunque a menudo pasada por alto: los construyeron los ancestros de los actuales Rapa Nui. Ni una civilización extranjera, ni visitantes de otro continente, ni una tecnología mítica. Personas con conocimiento sobre la piedra, el equilibrio, las cuerdas, la organización del trabajo y el significado de un objetivo común."
      ],
      imageAlt: "Visualización artística de las laderas de Rano Raraku con moáis integrados en el paisaje volcánico.",
      endLine: "Los moáis eran los rostros de piedra de la memoria. Su nacimiento comenzaba en un lugar extraordinario."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "La montaña de la que salían los ancestros",
      quote: "Primero aparecía un rostro en la roca. Después se separaba de la ladera el cuerpo entero.",
      paragraphs: [
        "La mayoría de los moáis nacieron en la cantera del volcán Rano Raraku. En la blanda toba volcánica, los escultores trazaban el contorno de una figura y, con herramientas llamadas toki, fabricadas de basalto duro, extraían poco a poco de la montaña un rostro, un torso y unas manos. La figura permanecía largo tiempo unida a la roca por la espalda. Solo en la fase final se separaba, se bajaba de la ladera y se preparaba para el transporte.",
        "Rano Raraku no es un cementerio de cabezas abandonadas. El volcán ha conservado casi cuatrocientas figuras en distintas fases de trabajo: algunas siguen incrustadas en la pared rocosa, otras se alzan parcialmente hundidas en la tierra, otras quedaron detenidas junto a los caminos que conducen hacia la costa. Juntas conforman el registro de un proceso tecnológico que ningún texto ha descrito con igual precisión.",
        "Lo más conmovedor es que muchas estatuas nunca llegaron a su ahu. Quedaron donde se interrumpió el trabajo, o cayeron en el camino. No son prueba de una desaparición repentina de sus constructores. Son huellas de un largo período de actividad, de cambios sociales y de empresas llevadas a cabo por distintas generaciones.",
        "Durante décadas, la forma de transportar los moáis se presentó como un enigma que exigía a cientos de personas, enormes cantidades de madera o una fuerza casi sobrehumana. La tradición de Rapa Nui, sin embargo, conservó la idea de que las estatuas «caminaban». Una de las hipótesis contemporáneas mejor desarrolladas sostiene que figuras con el perfil adecuado podían desplazarse en posición vertical, balanceándolas con cuerdas tiradas alternativamente a izquierda y derecha. Las investigaciones arqueológicas, los modelos físicos y los experimentos han demostrado que ese movimiento es posible. Esto no cierra toda la discusión, pero despoja a esta historia de una magia falsa y le devuelve algo mucho más interesante: el ingenio humano."
      ],
      aside: {
        title: "¿Cómo pudieron caminar los moáis?",
        body: "Los investigadores aún debaten las técnicas de transporte. Los experimentos han demostrado, sin embargo, que un moái con el centro de gravedad adecuado puede desplazarse en vertical mediante cuerdas y un balanceo rítmico, conforme a la tradición rapanui que dice que las estatuas caminaban."
      },
      imageAlt: "Visualización artística de las laderas de Rano Raraku con moáis integrados en el paisaje volcánico.",
      endLine: "El camino terminaba en el ahu. Pero incluso una estatua ya erigida no era todavía un rostro plenamente vivo."
    },
    mana: {
      eyebrow: "MANA",
      title: "Solo los ojos despertaron a la piedra",
      quote: "Sin ojos, el moái era un cuerpo monumental. Con ojos, se convertía en la mirada de un ancestro.",
      paragraphs: [
        "Durante mucho tiempo el mundo conoció los moáis sobre todo como figuras de cuencas vacías. Solo durante los trabajos en Ahu Nau Nau, en 1978, se halló un ojo completo, hecho de coral blanco y complementado con un elemento rojo de escoria volcánica. El hallazgo ayudó a comprender que el aspecto severo que hoy conocemos de las estatuas es una imagen incompleta.",
        "En la tradición de Rapa Nui, los moáis eran llamados aringa ora - rostros vivos de los ancestros. Colocar los ojos no era un acabado cosmético de la escultura. Devolvía simbólicamente a la estatua su capacidad de ver y permitía que el mana del ancestro actuara sobre sus descendientes. Precisamente esa mirada cerraba el camino desde la cantera hasta la comunidad: la roca se convertía en rostro, el rostro en presencia, y la presencia en parte de la vida del linaje.",
        "No todos los detalles de las antiguas ceremonias sobrevivieron. La ruptura de la transmisión intergeneracional en el siglo XIX se llevó consigo una enorme parte de ese conocimiento. Lo que se conserva, sin embargo, permite ver los moáis de otra manera - no como colosos silenciosos situados fuera del tiempo, sino como una relación entre los vivos y los muertos, la tierra y la genealogía, la memoria y la responsabilidad."
      ],
      aside: {
        title: "Nota importante sobre la imagen",
        body: "El material gráfico facilitado es una interpretación artística. Los ojos que se ven no se presentan como un hallazgo museístico auténtico. El hecho histórico sobre el ojo de Ahu Nau Nau se transmite en el texto."
      },
      imageAlt: "Visualización artística del rostro de un moái y el motivo simbólico de los ojos.",
      endLine: "Con el tiempo, el lenguaje de lo sagrado comenzó a cambiar. Rapa Nui entró en una nueva época - sin dejar de ser ella misma."
    },
    orongo: {
      eyebrow: "ORONGO Y TANGATA MANU",
      title: "La cultura cambió sus símbolos",
      quote: "El fin de la era de los moáis no fue el fin de Rapa Nui.",
      paragraphs: [
        "El entorno de la isla estaba cambiando. Los antiguos bosques retrocedían, crecía la presión sobre los recursos, y la estructura política y religiosa atravesaba transformaciones. Algunos moáis fueron derribados con el tiempo, muchos ahu perdieron su antigua función, y el centro de la vida ceremonial se desplazó hacia Orongo - un asentamiento situado en el borde del cráter del Rano Kau, en lo alto, sobre el océano y los islotes de Motu Nui, Motu Iti y Motu Kaokao.",
        "En unas cincuenta casas bajas de piedra se reunían periódicamente representantes de los linajes. A Orongo se vinculaba la ceremonia del Tangata Manu - el Hombre-Pájaro. Representantes elegidos por los líderes cruzaban hasta Motu Nui y esperaban el primer huevo de manutara de la temporada - un ave marina que anida en ese islote rocoso. El líder representado por quien encontraba el huevo recibía el título de Tangata Manu y una autoridad especial para el siguiente ciclo social y ritual.",
        "No se trataba de una «extraña competición» creada para el espectáculo. Era una nueva forma de ordenar el poder, lo sagrado y las relaciones entre grupos, en un mundo que había dejado de funcionar exactamente como en el momento álgido de la construcción de moáis. Los numerosos petroglifos del hombre-pájaro, los vínculos con Makemake y el emplazamiento dramático de Orongo muestran una cultura capaz de cambiar de formas sin abandonar su propia memoria.",
        "Entre los testimonios más extraordinarios de Rapa Nui figuran también las tablillas de madera cubiertas de signos rongorongo. Su sistema no ha sido descifrado de forma convincente hasta hoy. No se deben usar estos signos como una decoración cualquiera, ni fingir que conocemos su significado completo. Son un rastro material de un conocimiento cuya continuidad se interrumpió de manera dramática.",
        "Durante gran parte del siglo XX, la historia de la isla se contó como una advertencia sobre una sociedad que supuestamente destruyó su propio entorno y colapsó incluso antes de la llegada de los europeos. Los cambios ecológicos fueron reales, al igual que las tensiones y las transformaciones sociales. Pero las investigaciones publicadas en 2024 - tanto genéticas como sobre la escala de la agricultura antigua - no confirmaron un escenario simple de colapso brusco de la población en el siglo XVII. La imagen actual es más compleja: Rapa Nui cambiaba, enfrentaba límites y se adaptaba. El golpe más destructivo estaba todavía por llegar, y llegaría desde fuera."
      ],
      imageAlt: "Visualización artística de las viviendas de piedra de Orongo en un acantilado sobre el Pacífico.",
      endLine: "La isla sobrevivió a siglos de aislamiento. Casi no sobrevivió a su encuentro con un mundo que llegó buscando personas, tierra y beneficio."
    },
    zewnatrz: {
      eyebrow: "SIGLOS XVIII-XX",
      title: "El capítulo más oscuro llegó de fuera",
      quote: "Lo que siglos de aislamiento no lograron, la esclavitud, las epidemias y la explotación colonial estuvieron a punto de lograrlo.",
      paragraphs: [
        "En 1722 llegó a la isla la expedición holandesa de Jacob Roggeveen - el primer encuentro bien documentado entre los habitantes y los europeos. Las crónicas occidentales lo llamaron durante mucho tiempo «descubrimiento», aunque Rapa Nui ya contaba con su propia sociedad, historia, nombres de lugares y la memoria de muchas generaciones. Para los isleños no fue el comienzo de su historia, sino el inicio de contactos cada vez más peligrosos con el mundo exterior.",
        "Los sucesos más trágicos tuvieron lugar entre 1862 y 1863. Barcos negreros secuestraron desde Rapa Nui y otras islas de Polinesia a personas destinadas al trabajo forzado en Perú. Según fuentes históricas chilenas, pudieron ser tomadas de la propia Rapa Nui alrededor de 1.500 personas, entre ellas líderes, sacerdotes y conocedores de la tradición. El secuestro de las personas responsables de la memoria, las ceremonias y la transmisión del saber fue un golpe no solo demográfico, sino también cultural.",
        "Bajo presión internacional, parte de los secuestrados debía ser devuelta. Sin embargo, a la isla regresó apenas un puñado, y con ellos llegaron enfermedades infecciosas frente a las que la población local no tenía resistencia. Las epidemias, las nuevas salidas, la violencia y el colapso de las estructuras sociales provocaron un descenso catastrófico del número de habitantes. La UNESCO resume que la esclavitud, las enfermedades, la colonización, la introducción de la ganadería y el confinamiento de la población indígena en áreas cada vez más pequeñas redujeron la comunidad a poco más de un centenar de personas.",
        "En 1888, representantes de Chile y el ariki Atamu Tekena, junto con un consejo de líderes, firmaron los documentos hoy conocidos como el Acuerdo de Voluntades. Su interpretación - en especial las diferencias entre la versión española y la rapanui, y el alcance de la cesión de soberanía y de los derechos sobre la tierra - sigue siendo hasta hoy objeto de memoria y de controversia histórica. A partir de 1895, durante casi sesenta años, una gran parte de la isla se arrendó a una empresa ganadera, convirtiendo Rapa Nui en una enorme estancia de ovejas. La comunidad indígena quedó confinada espacialmente, y el acceso a su propia tierra quedó sujeto a una administración extranjera.",
        "Fue precisamente en este período cuando se rompieron muchas líneas de transmisión, se dispersaron objetos culturales, se llevaron restos de los ancestros y obras, y parte de la historia de la isla empezó a ser escrita sobre todo por extranjeros. Por eso, todo relato contemporáneo sobre Rapa Nui debe conservar la humildad: no todo lo que se perdió puede recuperarse, y la voz de la comunidad viva no puede sustituirse por una leyenda romántica sobre una «isla misteriosa y extinguida»."
      ],
      imageAlt: "",
      endLine:
        "Quedó poco más de un centenar de personas. Lo suficientemente pocas para que el mundo diera la cultura por moribunda. Lo suficiente para salvar su continuidad."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI HOY",
      title: "El pueblo que sobrevivió",
      quote: "Rapa Nui no es una ruina. Es un hogar.",
      paragraphs: [
        "Los descendientes de los antiguos habitantes siguen viviendo en la isla. Mantienen y revitalizan la lengua rapanui, devuelven significado a los nombres de los lugares, esculpen, cantan, bailan, relatan genealogías y emprenden acciones para proteger su patrimonio. Los moáis no son para ellos una atracción arqueológica anónima. Son parte del paisaje de los ancestros, de la memoria del linaje y de una conversación contemporánea sobre la identidad, la tierra y el derecho a decidir sobre su propio patrimonio.",
        "Uno de los hermosos ejemplos de esta continuidad viva es el Kai-kai. Con un hilo dispuesto entre los dedos se forman figuras acompañadas por la recitación del pāta'u-ta'u. De este modo pueden transmitirse relatos, paisajes, acontecimientos, mitología, genealogías y memoria colectiva. Lo que a un observador ocasional le parece un simple juego de cuerda es, en realidad, un vehículo de lengua y de experiencia de varias generaciones.",
        "En 2026 se organizó en Rapa Nui un festival de figuras narrativas de Kai-kai dedicado a la memoria de la maestra Isabel Pakarati Tepano. Participaron representantes de distintas generaciones, presentando relatos en rapanui y en español. Así es exactamente como perdura una cultura: no como una pieza congelada, sino como una práctica realizada con las manos, la voz y la memoria de personas vivas.",
        "Por eso, en esta sección no se puede hablar de Rapa Nui únicamente en pasado. Los habitantes de hoy no son una nota a pie de página de la historia de los moáis. Son los descendientes de sus creadores, los guardianes de estos lugares, artistas, investigadores, docentes y anfitriones de la isla. El relato no termina con la última estatua erigida ni con la llegada de los europeos. Continúa en las familias, en la lengua y en la recuperación consciente de su propia voz."
      ],
      imageAlt: "Visualización artística de un artesano anciano transmitiendo a un niño el arte de tallar, con moáis a lo lejos.",
      endLine:
        "RapaNuiPark no cuenta la historia de una civilización desaparecida. Cuenta la historia de un pueblo que sobrevivió - y de los rostros de los ancestros, que todavía miran."
    }
  },
  de: {
    ocean: {
      eyebrow: "DER ANFANG",
      title: "Zuerst war der Ozean",
      quote: "Für die ersten Seefahrer war der Pazifik keine Leere. Er war ein Weg.",
      paragraphs: [
        "Rapa Nui liegt etwa 3.700 Kilometer von der Küste des chilenischen Festlands entfernt. Auf der Karte wirkt sie wie ein winziger Punkt, umgeben von nahezu grenzenlosem Wasser. Für diejenigen, die sie als Erste erreichten, gab es keine Häfen, keine gedruckten Seekarten, keine Möglichkeit, Hilfe zu rufen. Es gab nur Wissen: die Stellung von Sonne und Sternen, die Richtung von Wind und Dünung, den Flug der Seevögel, die Form der Wolken und das über Generationen polynesischer Navigatoren weitergegebene Wissen um die Routen.",
        "Vor etwa tausend Jahren erreichte eine kleine Gruppe von Siedlern aus Ostpolynesien diese einsame Vulkaninsel. Es war keine zufällige Drift, sondern Teil eines der größten seefahrerischen Unternehmen der Menschheitsgeschichte - der Besiedlung eines riesigen Teils des Pazifiks durch Menschen, die weit über den Horizont hinaus Land finden konnten.",
        "Die mündliche Überlieferung Rapa Nuis verbindet den Anfang der Gemeinschaft mit dem ariki Hotu Matu'a und einer Heimat namens Hiva. Nicht jedes Element dieser Erzählung lässt sich auf eine moderne Karte oder ein genaues Datum übertragen. Ihre Bedeutung reicht jedoch tiefer als eine Chronik: Sie bewahrt die Erinnerung an eine Reise, an Herkunft, an Führung und an den Moment, in dem der Ozean aufhörte, nur ein Weg zu sein, und zur Grenze eines neuen Zuhauses wurde."
      ],
      imageAlt: "Künstlerische Visualisierung des endlosen Pazifiks, gesehen von den Klippen Rapa Nuis.",
      endLine: "Am Ende dieser Reise wartete kein Reich. Es wartete ein Land, in dem alles von Grund auf neu geschaffen werden musste."
    },
    adaptacja: {
      eyebrow: "ANPASSUNG",
      title: "Das größte Monument war das Überleben",
      quote: "Bevor die Moai entstanden, musste erst ein Leben aufgebaut werden.",
      paragraphs: [
        "Rapa Nui gab seinen Bewohnern keine unbegrenzten Ressourcen. Die Isolation bedeutete, dass jeder Fehler Folgen für die gesamte Gemeinschaft haben konnte. Der Boden war Wind, zeitweiligem Wassermangel und Erosion ausgesetzt, und der Ozean - so sehr er auch Nahrung lieferte - erlaubte nicht immer ein sicheres Auslaufen. Überleben verlangte Beobachtung, Geduld und eine an den Ort angepasste Technik.",
        "Die Bewohner schufen Steingärten und Schutzanlagen vom Typ Manavai. Auf dem Boden verteilte Gesteinsbrocken halfen, Feuchtigkeit zu speichern, minderten den Windeinfluss und stabilisierten die Temperatur rund um die Anbauflächen. Steinkreise schützten die Pflanzen, und das Wissen über Boden, Jahreszeiten, Wasser, Fischfang und Lebensmittellagerung war ebenso wichtig wie die Fähigkeit, Statuen zu meißeln. Die Landschaft der Insel war also keine passive Kulisse. Sie wurde von den Menschen und ihrer täglichen Arbeit mitgeschaffen.",
        "Die Gesellschaft organisierte sich um Abstammungslinien und Territorien. Die Genealogie bestimmte Zugehörigkeit, Pflichten und die Beziehung zum Land. Die Begriffe mana - geistige Kraft und Autorität - und tapu - die Regeln, die festlegten, was geschützt, heilig oder eingeschränkt war - ordneten nicht nur die Religion, sondern auch das gesellschaftliche Leben. Wissen stand nicht in Büchern. Es lebte im Gedächtnis der Menschen, in Ortsnamen, Liedern, Erzählungen, Gesten, Handwerk und gemeinsam ausgeübten Praktiken.",
        "Genau deshalb war die größte Errungenschaft Rapa Nuis nicht eine einzelne monumentale Figur. Es war ein Lebenssystem, das eine Gemeinschaft über Jahrhunderte hinweg an einem der abgelegensten Orte der Erde tragen konnte. Neuere Forschungen zur alten Landwirtschaft und zu den Genomen der Inselbewohner stellen zudem die populäre Erzählung von einem simplen, selbstzerstörerischen „Ökozid\" infrage. Sie zeigen eine Gesellschaft, die kleiner, flexibler und widerstandsfähiger war, als die westliche Populärkultur sie über Jahre dargestellt hat."
      ],
      imageAlt: "Künstlerische Visualisierung eines älteren Mannes, der einem Kind eine von Kai-kai inspirierte Fadenspiel-Tradition weitergibt.",
      endLine: "Erst eine Gemeinschaft, die gelernt hatte, das Leben zu erhalten, konnte der Erinnerung an ihre Ahnen dauerhafte Form geben."
    },
    "ahu-moai": {
      eyebrow: "AHU UND MOAI",
      title: "Die Ahnen blieben unter den Lebenden",
      quote: "Die Moai blickten nicht in die Leere. Sie blickten auf ihre Menschen.",
      paragraphs: [
        "Auf Rapa Nui entstanden mehr als dreihundert Ahu - steinerne Zeremonialplattformen, die mit Abstammungslinien, Erinnerung, Riten und Bestattungen verbunden waren. Auf vielen von ihnen wurden Moai aufgestellt: monumentale Figuren, die Ahnen oder Personen von besonderer Bedeutung darstellten. Eine Statue war weder Dekoration noch ein anonymes „Idol\". Sie verband die Lebenden mit der Genealogie, dem Territorium und der Autorität derer, die gegangen waren.",
        "Die meisten auf Ahu aufgestellten Moai kehrten dem Ozean den Rücken zu und richteten ihr Gesicht auf die Siedlungen, die Häuser und das von den Nachkommen bestellte Land. Ihre Anwesenheit sagte: Die Ahnen sind weiterhin Teil der Gemeinschaft. Sie wachen über den Ort, aus dem die Abstammungslinie hervorging, bestätigen ihre Verbindung zum Land und erinnern daran, dass die Gegenwart ohne Erinnerung nicht existiert.",
        "Auf der Insel wurden fast neunhundert Moai und mehr als dreihundert Zeremonialplattformen erfasst. Sie unterscheiden sich in Größe, Proportionen, Fertigstellungsgrad und Geschichte. Sie wurden nicht wie identische Monumente eines einzigen Staates hergestellt. Sie entstanden in einer Welt vieler Familiengruppen und lokaler Zeremonialzentren. Jede Figur gehörte zu einer bestimmten Landschaft und einem bestimmten Beziehungsgeflecht.",
        "Deshalb hat die Frage „Wer hat die Moai gebaut?\" eine einfache, wenn auch oft übergangene Antwort: Gebaut haben sie die Ahnen der heutigen Rapa-Nui-Bevölkerung. Keine fremde Zivilisation, keine Besucher von einem anderen Kontinent und keine mythische Technologie. Menschen mit Wissen über Stein, Gleichgewicht, Seile, Arbeitsorganisation und die Bedeutung eines gemeinsamen Ziels."
      ],
      imageAlt: "Künstlerische Visualisierung der Hänge des Rano Raraku mit Moai in der vulkanischen Landschaft.",
      endLine: "Die Moai waren die steinernen Gesichter der Erinnerung. Ihre Geburt begann an einem außergewöhnlichen Ort."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "Der Berg, aus dem die Ahnen hervortraten",
      quote: "Zuerst erschien ein Gesicht im Fels. Dann wurde der ganze Körper vom Hang gelöst.",
      paragraphs: [
        "Die meisten Moai entstanden im Steinbruch des Vulkans Rano Raraku. Im weichen Vulkantuff zeichneten die Bildhauer den Umriss einer Figur vor und lösten dann mit Werkzeugen namens toki, gefertigt aus hartem Basalt, nach und nach Gesicht, Rumpf und Hände aus dem Berg. Die Figur blieb lange mit dem Rücken mit dem Fels verbunden. Erst in der letzten Phase wurde sie abgetrennt, vom Hang herabgelassen und für den Transport vorbereitet.",
        "Rano Raraku ist kein Friedhof verlassener Köpfe. Der Vulkan hat fast vierhundert Figuren in verschiedenen Arbeitsstadien bewahrt: manche liegen noch in der Felswand, andere stehen teilweise im Boden versunken, wieder andere blieben an den zur Küste führenden Wegen stehen. Zusammen bilden sie das Zeugnis eines technologischen Prozesses, das kein Text je so genau beschrieben hat.",
        "Am bewegendsten ist, dass viele Statuen nie ihren Ahu erreichten. Sie blieben dort, wo die Arbeit unterbrochen wurde, oder fielen unterwegs um. Sie sind kein Beweis für ein plötzliches Verschwinden der Erbauer. Sie sind Spuren einer langen Schaffensperiode, gesellschaftlicher Veränderungen und von Unternehmungen, die über verschiedene Generationen hinweg verwirklicht wurden.",
        "Jahrzehntelang wurde die Art des Moai-Transports als Rätsel dargestellt, das Hunderte Menschen, enorme Mengen Holz oder fast übermenschliche Kraft erforderte. Die Tradition Rapa Nuis hat jedoch die Aussage bewahrt, dass die Statuen „gingen\". Eine der am besten ausgearbeiteten zeitgenössischen Hypothesen geht davon aus, dass entsprechend geformte Figuren aufrecht bewegt werden konnten, indem man sie mit Seilen abwechselnd nach links und rechts schwenkte. Archäologische Untersuchungen, physische Modelle und Experimente haben gezeigt, dass eine solche Bewegung möglich ist. Das beendet nicht die ganze Diskussion, nimmt der Geschichte aber ihre falsche Magie und gibt ihr etwas viel Interessanteres zurück: menschlichen Einfallsreichtum."
      ],
      aside: {
        title: "Wie könnten die Moai gegangen sein?",
        body: "Forscher diskutieren noch über die Transporttechniken. Experimente haben jedoch gezeigt, dass ein Moai mit passendem Schwerpunkt aufrecht mithilfe von Seilen und rhythmischem Schwenken geführt werden kann - im Einklang mit der Rapa-Nui-Tradition, wonach die Statuen gingen."
      },
      imageAlt: "Künstlerische Visualisierung der Hänge des Rano Raraku mit Moai in der vulkanischen Landschaft.",
      endLine: "Der Weg endete am Ahu. Doch auch eine aufgestellte Statue war noch kein vollständig lebendiges Gesicht."
    },
    mana: {
      eyebrow: "MANA",
      title: "Erst die Augen weckten den Stein",
      quote: "Ohne Augen war der Moai ein monumentaler Körper. Mit Augen wurde er zum Blick eines Ahnen.",
      paragraphs: [
        "Lange kannte die Welt die Moai vor allem als Figuren mit leeren Augenhöhlen. Erst bei Arbeiten am Ahu Nau Nau im Jahr 1978 wurde ein vollständiges Auge gefunden, gefertigt aus weißem Korallen, ergänzt durch ein rotes Element aus vulkanischer Schlacke. Der Fund half zu verstehen, dass das heute bekannte strenge Aussehen der Statuen ein unvollständiges Bild ist.",
        "In der Tradition Rapa Nuis wurden die Moai als aringa ora bezeichnet - lebendige Gesichter der Ahnen. Das Einsetzen der Augen war kein kosmetischer Schliff der Skulptur. Es stellte symbolisch ihre Fähigkeit zu sehen wieder her und ließ das mana des Ahnen auf seine Nachkommen einwirken. Genau dieser Blick schloss den Weg vom Steinbruch zur Gemeinschaft: Der Fels wurde zum Gesicht, das Gesicht zur Anwesenheit, und die Anwesenheit zum Teil des Lebens der Abstammungslinie.",
        "Nicht alle Einzelheiten der alten Zeremonien haben überdauert. Der Abbruch der generationenübergreifenden Weitergabe im 19. Jahrhundert nahm einen enormen Teil dieses Wissens mit sich. Was erhalten blieb, lässt die Moai jedoch anders sehen - nicht als stumme, zeitlose Kolosse, sondern als Beziehung zwischen den Lebenden und den Toten, Land und Genealogie, Erinnerung und Verantwortung."
      ],
      aside: {
        title: "Wichtiger Hinweis zum Bild",
        body: "Das bereitgestellte Bildmaterial ist eine künstlerische Interpretation. Die sichtbaren Augen werden nicht als authentischer musealer Fund ausgewiesen. Die historische Tatsache zum Auge von Ahu Nau Nau wird im Text vermittelt."
      },
      imageAlt: "Künstlerische Visualisierung eines Moai-Gesichts und des symbolischen Augenmotivs.",
      endLine: "Mit der Zeit begann sich die Sprache des Sakralen zu wandeln. Rapa Nui trat in eine neue Epoche ein - hörte aber nicht auf, es selbst zu sein."
    },
    orongo: {
      eyebrow: "ORONGO UND TANGATA MANU",
      title: "Die Kultur wechselte ihre Symbole",
      quote: "Das Ende der Moai-Ära war nicht das Ende Rapa Nuis.",
      paragraphs: [
        "Die Umwelt der Insel veränderte sich. Die alten Wälder wichen zurück, der Druck auf die Ressourcen wuchs, und die politische wie religiöse Struktur befand sich im Wandel. Manche Moai wurden mit der Zeit gestürzt, viele Ahu verloren ihre frühere Funktion, und das Zentrum des zeremoniellen Lebens verlagerte sich nach Orongo - eine Siedlung am Rand des Kraters Rano Kau, hoch über dem Ozean und den Inselchen Motu Nui, Motu Iti und Motu Kaokao.",
        "In rund fünfzig niedrigen Steinhäusern versammelten sich periodisch Vertreter der Abstammungslinien. Mit Orongo verbunden war die Zeremonie des Tangata Manu - des Vogelmenschen. Von den Anführern gewählte Vertreter setzten nach Motu Nui über und warteten auf das erste manutara-Ei der Saison - ein Seevogel, der auf diesem felsigen Inselchen nistet. Der Anführer, vertreten durch denjenigen, der das Ei fand, erhielt den Titel Tangata Manu und eine besondere Autorität für den kommenden gesellschaftlichen und rituellen Zyklus.",
        "Dies war kein „seltsamer Wettbewerb\", der zur Unterhaltung erfunden wurde. Es war eine neue Art, Macht, das Sakrale und die Beziehungen zwischen Gruppen zu ordnen, in einer Welt, die nicht mehr genauso funktionierte wie zur Blütezeit des Moai-Baus. Zahlreiche Vogelmensch-Petroglyphen, die Verbindungen zu Makemake und die dramatische Lage Orongos zeigen eine Kultur, die ihre Formen wandeln konnte, ohne die eigene Erinnerung aufzugeben.",
        "Zu den bemerkenswertesten Zeugnissen Rapa Nuis gehören auch die mit rongorongo-Zeichen bedeckten Holztafeln. Ihr System ist bis heute nicht überzeugend entziffert. Diese Zeichen sollten nicht als beliebige Dekoration verwendet werden, ebenso wenig sollte man vorgeben, ihre vollständige Bedeutung zu kennen. Sie sind eine materielle Spur eines Wissens, dessen Kontinuität dramatisch unterbrochen wurde.",
        "Über weite Teile des 20. Jahrhunderts wurde die Geschichte der Insel als Warnung erzählt - vor einer Gesellschaft, die ihre eigene Umwelt zerstört und noch vor der Ankunft der Europäer zusammengebrochen sein soll. Ökologische Veränderungen waren real, ebenso wie gesellschaftliche Spannungen und Umbrüche. Doch 2024 veröffentlichte Forschung - sowohl genetisch als auch zum Umfang der alten Landwirtschaft - bestätigte kein einfaches Szenario eines abrupten Bevölkerungskollapses im 17. Jahrhundert. Das heutige Bild ist komplexer: Rapa Nui veränderte sich, stieß an Grenzen und passte sich an. Der zerstörerischste Schlag sollte erst noch kommen - von außen."
      ],
      imageAlt: "Künstlerische Visualisierung der Steinhäuser von Orongo auf einer Klippe über dem Pazifik.",
      endLine: "Die Insel überstand Jahrhunderte der Isolation. Sie überstand fast nicht die Begegnung mit einer Welt, die um der Menschen, des Landes und des Gewinns willen kam."
    },
    zewnatrz: {
      eyebrow: "18.-20. JAHRHUNDERT",
      title: "Das dunkelste Kapitel kam von außen",
      quote: "Was Jahrhunderte der Isolation nicht geschafft hatten, schafften beinahe Sklaverei, Epidemien und koloniale Ausbeutung.",
      paragraphs: [
        "1722 erreichte die niederländische Expedition Jacob Roggeveens die Insel - die erste gut dokumentierte Begegnung der Inselbewohner mit Europäern. In westlichen Chroniken wurde sie lange als „Entdeckung\" bezeichnet, obwohl Rapa Nui bereits über eine eigene Gesellschaft, Geschichte, Ortsnamen und die Erinnerung vieler Generationen verfügte. Für die Inselbewohner war es nicht der Beginn ihrer Geschichte, sondern der Beginn zunehmend gefährlicher Kontakte mit der Außenwelt.",
        "Die tragischsten Ereignisse spielten sich in den Jahren 1862-1863 ab. Schiffe von Sklavenhändlern verschleppten von Rapa Nui und anderen polynesischen Inseln Menschen zur Zwangsarbeit in Peru. Chilenischen historischen Quellen zufolge könnten allein von Rapa Nui rund 1.500 Menschen verschleppt worden sein, darunter Anführer, Priester und Kenner der Tradition. Die Entführung der für Erinnerung, Zeremonien und Wissensweitergabe verantwortlichen Menschen war nicht nur ein demografischer, sondern auch ein kultureller Schlag.",
        "Unter internationalem Druck sollte ein Teil der Verschleppten zurückgeschickt werden. Auf die Insel kehrte jedoch nur eine Handvoll zurück, und mit ihnen kamen Infektionskrankheiten, gegen die die einheimische Bevölkerung keine Widerstandskraft besaß. Epidemien, weitere Abreisen, Gewalt und der Zusammenbruch gesellschaftlicher Strukturen führten zu einem katastrophalen Rückgang der Bevölkerungszahl. Die UNESCO fasst zusammen, dass Sklaverei, Krankheiten, Kolonisierung, die Einführung der Viehzucht und die Einschränkung der indigenen Bevölkerung auf immer kleinere Gebiete die Gemeinschaft auf wenig mehr als hundert Menschen reduzierten.",
        "1888 unterzeichneten Vertreter Chiles sowie der ariki Atamu Tekena und ein Rat von Anführern die heute als „Vereinbarung der Willen\" bekannten Dokumente. Ihre Interpretation - insbesondere die Unterschiede zwischen der spanischen und der rapanuischen Fassung sowie die Bedeutung der Übertragung von Souveränität und Landrechten - bleibt bis heute Gegenstand von Erinnerung und historischem Streit. Ab 1895 wurde fast sechzig Jahre lang ein großer Teil der Insel an ein Viehzuchtunternehmen verpachtet, das Rapa Nui in eine riesige Schaffarm verwandelte. Die indigene Gemeinschaft wurde räumlich eingeschränkt, und der Zugang zum eigenen Land unterlag einer fremden Verwaltung.",
        "Genau in dieser Zeit wurden viele Übertragungslinien unterbrochen, Kulturgegenstände zerstreut, die Überreste von Ahnen und Werke fortgeschafft, und ein Teil der Geschichte wurde fortan vor allem von Ausländern geschrieben. Deshalb sollte jede gegenwärtige Erzählung über Rapa Nui Demut bewahren: Nicht alles, was verloren ging, lässt sich wiederherstellen, und die Stimme der lebenden Gemeinschaft lässt sich nicht durch eine romantische Legende von einer „geheimnisvollen, ausgestorbenen Insel\" ersetzen."
      ],
      imageAlt: "",
      endLine:
        "Es blieben wenig mehr als hundert Menschen übrig. Wenig genug, damit die Welt die Kultur für sterbend hielt. Genug, um ihre Kontinuität zu retten."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI HEUTE",
      title: "Das Volk, das überlebte",
      quote: "Rapa Nui ist keine Ruine. Es ist ein Zuhause.",
      paragraphs: [
        "Die Nachkommen der früheren Bewohner leben noch immer auf der Insel. Sie bewahren und beleben die rapanuische Sprache, geben Ortsnamen ihre Bedeutung zurück, schnitzen, singen, tanzen, erzählen Genealogien und setzen sich für den Schutz ihres Erbes ein. Die Moai sind für sie keine anonyme archäologische Attraktion. Sie sind Teil der Ahnenlandschaft, des Erinnerungsvermächtnisses ihrer Abstammungslinien und eines gegenwärtigen Gesprächs über Identität, Land und das Recht, über das eigene Erbe zu entscheiden.",
        "Eines der schönen Beispiele lebendiger Kontinuität ist Kai-kai. Mit einer zwischen den Fingern gespannten Schnur entstehen Figuren, begleitet von der Rezitation von pāta'u-ta'u. So lassen sich Geschichten, Landschaften, Ereignisse, Mythologie, Genealogien und kollektive Erinnerung weitergeben. Was einem zufälligen Beobachter wie ein Spiel mit Schnur erscheint, ist Trägerin von Sprache und mehrgenerationaler Erfahrung.",
        "2026 wurde auf Rapa Nui ein Festival der Kai-kai-Erzählfiguren veranstaltet, das dem Andenken der Meisterin Isabel Pakarati Tepano gewidmet war. Vertreter verschiedener Generationen nahmen teil und präsentierten Geschichten auf Rapanuisch und Spanisch. Genau so besteht Kultur fort: nicht als eingefrorenes Exponat, sondern als Praxis, ausgeübt mit den Händen, der Stimme und der Erinnerung lebender Menschen.",
        "Deshalb darf in diesem Abschnitt nicht ausschließlich in der Vergangenheitsform über Rapa Nui gesprochen werden. Die heutigen Bewohner sind keine Fußnote zur Geschichte der Moai. Sie sind die Nachkommen ihrer Schöpfer, Hüter dieser Orte, Künstler, Forscher, Lehrer und Gastgeber der Insel. Die Geschichte endet weder mit der letzten aufgestellten Statue noch mit der Ankunft der Europäer. Sie setzt sich fort in Familien, in der Sprache und in der bewussten Rückgewinnung der eigenen Stimme."
      ],
      imageAlt: "Künstlerische Visualisierung eines älteren Handwerkers, der einem Kind die Schnitzkunst weitergibt, mit Moai in der Ferne.",
      endLine:
        "RapaNuiPark erzählt nicht die Geschichte einer verschwundenen Zivilisation. Es erzählt die Geschichte eines Volkes, das überlebt hat - und der Gesichter der Ahnen, die noch immer blicken."
    }
  },
  cs: {
    ocean: {
      eyebrow: "POČÁTEK",
      title: "Nejdřív byl oceán",
      quote: "Pro první mořeplavce nebyl Pacifik prázdnotou. Byl cestou.",
      paragraphs: [
        "Rapa Nui leží asi 3 700 kilometrů od pobřeží kontinentálního Chile. Na mapě vypadá jako nepatrný bod obklopený téměř nekonečnou vodou. Pro lidi, kteří sem dorazili jako první, neexistovaly přístavy, tištěné mapy ani možnost přivolat pomoc. Existovaly jen znalosti: poloha slunce a hvězd, směr větrů a vln, let mořských ptáků, tvar mraků a paměť tras předávaná dalšími generacemi polynéských navigátorů.",
        "Přibližně před tisíci lety dosáhla tohoto osamělého sopečného ostrova malá skupina osadníků z východní Polynésie. Nešlo o náhodný unos proudem, ale o součást jednoho z největších mořeplaveckých počinů v dějinách lidstva - osídlení obrovské části Pacifiku lidmi, kteří dokázali najít zemi daleko za obzorem.",
        "Ústní tradice Rapa Nui váže počátek společenství k ariki Hotu Matu'a a domovině zvané Hiva. Ne všechny prvky tohoto vyprávění lze přenést na moderní mapu nebo přesné datum. Jeho význam je však hlubší než kronikářský záznam: uchovává paměť na cestu, původ, vůdcovství a okamžik, kdy oceán přestal být pouze cestou a stal se hranicí nového domova."
      ],
      imageAlt: "Umělecká vizualizace nekonečného Pacifiku viděného z útesů Rapa Nui.",
      endLine: "Na konci této cesty nečekala žádná říše. Čekala země, na které bylo třeba všechno vytvořit od začátku."
    },
    adaptacja: {
      eyebrow: "ADAPTACE",
      title: "Největším monumentem bylo přežití",
      quote: "Než vznikli moai, bylo třeba vybudovat život.",
      paragraphs: [
        "Rapa Nui nedávala svým obyvatelům neomezené zdroje. Izolace znamenala, že každá chyba mohla mít důsledky pro celé společenství. Půda byla vystavena větru, občasnému nedostatku vody a erozi, a oceán - ač poskytoval potravu - ne vždy dovoloval bezpečně vyplout. Přežití vyžadovalo pozorování, trpělivost a technologii přizpůsobenou danému místu.",
        "Obyvatelé vytvářeli kamenné zahrady a ochranné konstrukce typu manavai. Kamenné úlomky rozložené na zemi pomáhaly zadržovat vlhkost, omezovaly vliv větru a stabilizovaly teplotu kolem plodin. Kamenné kruhy chránily rostliny a znalost půdy, ročních období, vody, rybolovu a uchovávání potravin byla stejně důležitá jako dovednost tesat sochy. Krajina ostrova tedy nebyla pasivní kulisou. Byla spoluvytvářena lidmi a jejich každodenní prací.",
        "Společnost se organizovala kolem rodových linií a území. Genealogie určovala příslušnost, povinnosti a vztah k zemi. Pojmy mana - duchovní síla a autorita - a tapu - pravidla vymezující to, co je chráněné, posvátné nebo omezené - uspořádávaly nejen náboženství, ale i společenský život. Vědění nebylo v knihách. Žilo v paměti lidí, v názvech míst, písních, vyprávěních, gestech, řemesle a společně vykonávaných praktikách.",
        "Právě proto nebyl největším úspěchem Rapa Nui jediný monumentální výtvor. Byl jím systém života schopný udržet společenství po staletí na jednom z nejizolovanějších míst na Zemi. Nejnovější výzkumy dávného zemědělství a genomů obyvatel navíc zpochybňují oblíbený příběh o prosté, sebevražedné „ekocidě\". Ukazují společnost menší, pružnější a odolnější, než jak ji po léta líčila západní popkultura."
      ],
      imageAlt: "Umělecká vizualizace staršího muže předávajícího dítěti tradici práce s provázkem inspirovanou Kai-kai.",
      endLine: "Teprve společenství, které se naučilo udržet život, mohlo dát trvalou podobu paměti na své předky."
    },
    "ahu-moai": {
      eyebrow: "AHU A MOAI",
      title: "Předkové zůstali mezi živými",
      quote: "Moai nehleděli do prázdna. Hleděli na své lidi.",
      paragraphs: [
        "Na Rapa Nui vzniklo více než tři sta ahu - kamenných obřadních plošin spojených s rodovými liniemi, pamětí, obřady a pohřby. Na mnoha z nich byli vztyčeni moai: monumentální postavy zobrazující předky nebo osoby zvláštního významu. Socha nebyla ozdobou ani anonymním „idolem\". Spojovala živé s genealogií, územím a autoritou těch, kteří odešli.",
        "Většina moai umístěných na ahu se otáčela zády k oceánu a obracela tvář k osadám, domovům a zemi obdělávané potomky. Jejich přítomnost říkala: předkové jsou stále součástí společenství. Bdí nad místem, z něhož rod vzešel, potvrzují jeho pouto se zemí a připomínají, že přítomnost neexistuje bez paměti.",
        "Na ostrově bylo zaevidováno téměř devět set moai a více než tři sta obřadních plošin. Liší se velikostí, proporcemi, mírou dokončení a historií. Nebyly vyráběny jako identické monumenty jednoho státu. Vznikaly ve světě mnoha rodinných skupin a místních obřadních center. Každá socha náležela ke konkrétní krajině a konkrétní síti vztahů.",
        "Proto má otázka „kdo postavil moai?\" jednoduchou, byť často opomíjenou odpověď: postavili je předkové dnešních obyvatel Rapa Nui. Ne cizí civilizace, ne příchozí z jiného kontinentu a ne mytická technologie. Lidé, kteří měli znalosti o kameni, rovnováze, lanech, organizaci práce a významu společného cíle."
      ],
      imageAlt: "Umělecká vizualizace svahů Rano Raraku s moai zasazenými do sopečné krajiny.",
      endLine: "Moai byli kamennými tvářemi paměti. Jejich zrození začínalo na jednom výjimečném místě."
    },
    "rano-raraku": {
      eyebrow: "RANO RARAKU",
      title: "Hora, z níž vycházeli předkové",
      quote: "Nejprve se ve skále objevila tvář. Poté bylo celé tělo odděleno od svahu.",
      paragraphs: [
        "Většina moai se zrodila v lomu sopky Rano Raraku. V měkkém sopečném tufu vyznačovali řezbáři obrys postavy a poté pomocí nástrojů zvaných toki, vyrobených z tvrdého čediče, postupně vydobývali z hory tvář, trup a ruce. Socha zůstávala dlouho zády spojená se skálou. Teprve v závěrečné fázi byla oddělena, spuštěna ze svahu a připravena k převozu.",
        "Rano Raraku není hřbitovem opuštěných hlav. Sopka uchovala téměř čtyři sta soch v různých fázích práce: některé stále leží ve skalní stěně, jiné stojí částečně zabořené v zemi, další se zastavily podél cest vedoucích k pobřeží. Dohromady tvoří záznam technologického procesu, který žádný text nepopsal stejně přesně.",
        "Nejdojemnější je, že mnoho soch nikdy nedorazilo na svou ahu. Zůstaly na místě, kde byla práce přerušena, nebo cestou upadly. Nejsou důkazem náhlého zmizení stavitelů. Jsou stopami dlouhého období činnosti, společenských změn a počinů uskutečněných napříč různými generacemi.",
        "Po desetiletí byl způsob přepravy moai představován jako hádanka vyžadující stovky lidí, obrovské množství dřeva nebo téměř nadlidskou sílu. Tradice Rapa Nui si však uchovala tvrzení, že sochy „chodily\". Jedna z nejlépe propracovaných současných hypotéz předpokládá, že vhodně tvarované sochy bylo možné přesouvat ve svislé poloze, kolébáním pomocí lan tažených střídavě doleva a doprava. Archeologické výzkumy, fyzikální modely a experimenty ukázaly, že takový pohyb je možný. Nezavírá to celou diskusi, ale zbavuje tento příběh falešné magie a vrací mu něco mnohem zajímavějšího: lidskou vynalézavost."
      ],
      aside: {
        title: "Jak mohli moai chodit?",
        body: "Badatelé stále diskutují o technikách přepravy. Experimenty však ukázaly, že moai se správně umístěným těžištěm lze vést ve svislé poloze pomocí lan a rytmického kolébání - v souladu s tradicí Rapa Nui, podle níž sochy chodily."
      },
      imageAlt: "Umělecká vizualizace svahů Rano Raraku s moai zasazenými do sopečné krajiny.",
      endLine: "Cesta končila na ahu. Ale ani vztyčená socha ještě nebyla zcela živou tváří."
    },
    mana: {
      eyebrow: "MANA",
      title: "Teprve oči probudily kámen",
      quote: "Bez očí byl moai monumentálním tělem. S očima se stával pohledem předka.",
      paragraphs: [
        "Svět dlouho znal moai především jako sochy s prázdnými očními důlky. Teprve při pracích na Ahu Nau Nau v roce 1978 bylo nalezeno kompletní oko vyrobené z bílého korálu, doplněné červeným prvkem ze sopečné strusky. Tento objev pomohl pochopit, že dnes známý strohý vzhled soch je neúplným obrazem.",
        "V tradici Rapa Nui byli moai označováni jako aringa ora - živé tváře předků. Osazení očí nebylo kosmetickým dokončením sochy. Symbolicky jí navracelo schopnost vidět a umožňovalo, aby mana předka působila na potomky. Právě tento pohled uzavíral cestu od lomu ke společenství: skála se stávala tváří, tvář přítomností a přítomnost součástí života rodu.",
        "Ne všechny podrobnosti dávných obřadů se dochovaly. Přerušení mezigeneračního předávání v 19. století si vzalo obrovskou část tohoto vědění. To, co se zachovalo, však umožňuje vidět moai jinak - nikoli jako mlčenlivé kolosy stojící mimo čas, ale jako vztah mezi živými a mrtvými, zemí a genealogií, pamětí a odpovědností."
      ],
      aside: {
        title: "Důležitá poznámka k obrázku",
        body: "Poskytnutý obrazový materiál je uměleckou interpretací. Viditelné oči nejsou prezentovány jako autentický muzejní nález. Historický fakt o oku z Ahu Nau Nau uvádíme v textu."
      },
      imageAlt: "Umělecká vizualizace tváře moai a symbolického motivu očí.",
      endLine: "Časem se jazyk posvátna začal měnit. Rapa Nui vstoupila do nové éry - ale nepřestala být sama sebou."
    },
    orongo: {
      eyebrow: "ORONGO A TANGATA MANU",
      title: "Kultura změnila své symboly",
      quote: "Konec éry moai nebyl koncem Rapa Nui.",
      paragraphs: [
        "Prostředí ostrova se měnilo. Dávné lesy ustupovaly, rostl tlak na zdroje a politická i náboženská struktura procházela proměnami. Část moai byla časem svržena, mnoho ahu ztratilo svou dřívější funkci a centrum obřadního života se přesunulo k Orongo - osadě ležící na okraji kráteru Rano Kau, vysoko nad oceánem a ostrůvky Motu Nui, Motu Iti a Motu Kaokao.",
        "V asi padesáti nízkých kamenných domech se pravidelně scházeli zástupci rodových linií. S Orongo byl spjat obřad Tangata Manu - Ptačího muže. Vybraní zástupci vůdců se přeplavili na Motu Nui a čekali na první letošní vejce manutary - mořského ptáka hnízdícího na tomto skalnatém ostrůvku. Vůdce zastoupený tím, kdo vejce nalezl, získal titul Tangata Manu a zvláštní autoritu pro následující společenský a rituální cyklus.",
        "Nešlo o „podivnou soutěž\" vytvořenou pro podívanou. Byl to nový způsob uspořádání moci, posvátna a vztahů mezi skupinami ve světě, který přestal fungovat přesně tak jako ve vrcholném období stavby moai. Četné petroglyfy ptačího muže, vazby na Makemake a dramatická poloha Orongo ukazují kulturu schopnou měnit formy, aniž by opustila vlastní paměť.",
        "K nejpozoruhodnějším svědectvím Rapa Nui patří také dřevěné destičky pokryté znaky rongorongo. Jejich systém dosud nebyl přesvědčivě rozluštěn. Tyto znaky by se neměly používat jako náhodná dekorace, ani bychom neměli předstírat, že známe jejich plný význam. Jsou hmotnou stopou vědění, jehož kontinuita byla dramaticky přerušena.",
        "Po velkou část 20. století bylo dějiny ostrova vyprávěny jako varování před společností, která měla zničit vlastní prostředí a zhroutit se ještě před příchodem Evropanů. Ekologické změny byly skutečné, stejně jako sociální napětí a proměny. Výzkumy publikované v roce 2024 - jak genetické, tak týkající se rozsahu dávného zemědělství - však nepotvrdily jednoduchý scénář náhlého zhroucení populace v 17. století. Dnešní obraz je složitější: Rapa Nui se měnila, potýkala se s omezeními a přizpůsobovala se. Nejničivější úder měl teprve přijít - zvenčí."
      ],
      imageAlt: "Umělecká vizualizace kamenných staveb Orongo na útesu nad Pacifikem.",
      endLine: "Ostrov přežil staletí izolace. Téměř nepřežil setkání se světem, který přišel kvůli lidem, zemi a zisku."
    },
    zewnatrz: {
      eyebrow: "18.-20. STOLETÍ",
      title: "Nejtemnější kapitola přišla zvenčí",
      quote: "Co nedokázala staletí izolace, téměř dokázaly otroctví, epidemie a koloniální vykořisťování.",
      paragraphs: [
        "V roce 1722 dorazila na ostrov holandská výprava Jacoba Roggeveena - první dobře zdokumentované setkání obyvatel s Evropany. V západních kronikách bylo dlouho nazýváno „objevením\", ačkoli Rapa Nui již měla vlastní společnost, historii, místní názvy a paměť mnoha generací. Pro ostrovany to nebyl počátek dějin, nýbrž počátek stále nebezpečnějších kontaktů s vnějším světem.",
        "Nejtragičtější události se odehrály v letech 1862-1863. Lodě obchodníků s otroky unesly z Rapa Nui a dalších polynéských ostrovů lidi určené k nucené práci v Peru. Podle chilských historických pramenů mohlo být ze samotné Rapa Nui odvezeno asi 1 500 osob, včetně vůdců, kněží a znalců tradice. Únos lidí odpovědných za paměť, obřady a předávání vědění byl ranou nejen demografickou, ale i kulturní.",
        "Pod mezinárodním tlakem měla být část unesených navrácena. Na ostrov se však vrátila jen hrstka, a s ní infekční nemoci, vůči nimž místní obyvatelstvo nemělo odolnost. Epidemie, další odchody, násilí a rozpad společenských struktur vedly ke katastrofálnímu poklesu počtu obyvatel. UNESCO shrnuje, že otroctví, nemoci, kolonizace, zavedení chovu dobytka a omezování původního obyvatelstva na stále menší území snížily společenství na jen o něco více než sto lidí.",
        "V roce 1888 podepsali zástupci Chile a ariki Atamu Tekena spolu s radou vůdců dokumenty dnes známé jako Dohoda vůlí. Jejich výklad - zejména rozdíly mezi španělskou a rapanujskou verzí a význam předání suverenity a práv k půdě - zůstává dodnes předmětem paměti i historického sporu. Od roku 1895 byla po téměř šedesát let velká část ostrova pronajata chovatelské společnosti, což proměnilo Rapa Nui ve velkou ovčí farmu. Původní společenství bylo prostorově omezeno a přístup k vlastní zemi podléhal cizí správě.",
        "Právě v tomto období bylo přerušeno mnoho linií předávání, byly rozptýleny kulturní předměty, odvezeny ostatky předků i díla a část historie začali psát především cizinci. Proto by si každé současné vyprávění o Rapa Nui mělo zachovat pokoru: ne vše, co bylo ztraceno, lze obnovit, a hlas žijícího společenství nelze nahradit romantickou legendou o „tajemném, vymřelém ostrově\"."
      ],
      imageAlt: "",
      endLine:
        "Zbylo jen o málo více než sto lidí. Dost málo na to, aby svět považoval kulturu za zanikající. Dost na to, aby zachránili její kontinuitu."
    },
    dzisiaj: {
      eyebrow: "RAPA NUI DNES",
      title: "Národ, který přežil",
      quote: "Rapa Nui není zřícenina. Je domovem.",
      paragraphs: [
        "Potomci dávných obyvatel na ostrově stále žijí. Udržují a oživují rapanujský jazyk, navracejí význam místním názvům, tvoří sochy, zpívají, tančí, vyprávějí genealogie a podnikají kroky na ochranu dědictví. Moai pro ně nejsou anonymní archeologickou atrakcí. Jsou součástí krajiny předků, rodové paměti a současné rozpravy o identitě, zemi a právu rozhodovat o vlastním dědictví.",
        "Jedním z krásných příkladů živé kontinuity je Kai-kai. Pomocí nitě vedené mezi prsty vznikají figury doprovázené recitací pāta'u-ta'u. Tímto způsobem lze předávat příběhy, krajiny, události, mytologii, genealogie a kolektivní paměť. To, co náhodnému pozorovateli připadá jako hra s provázkem, je nositelem jazyka a mnohagenerační zkušenosti.",
        "V roce 2026 se na Rapa Nui konal festival vyprávěcích figur Kai-kai věnovaný památce mistryně Isabel Pakarati Tepano. Zúčastnili se zástupci různých generací a předváděli příběhy v rapanujštině a španělštině. Přesně takto kultura trvá: ne jako zamrzlý exponát, ale jako praxe vykonávaná rukama, hlasem a pamětí žijících lidí.",
        "Proto v této části nelze o Rapa Nui mluvit pouze v minulém čase. Dnešní obyvatelé nejsou poznámkou pod čarou k dějinám moai. Jsou potomky jejich tvůrců, strážci těchto míst, umělci, badateli, učiteli a hostiteli ostrova. Příběh nekončí posledním vztyčeným sousoším ani příchodem Evropanů. Pokračuje v rodinách, v jazyce a ve vědomém znovunabývání vlastního hlasu."
      ],
      imageAlt: "Umělecká vizualizace staršího řemeslníka předávajícího dítěti umění řezbářství, s moai v dálce.",
      endLine:
        "RapaNuiPark nevypráví o civilizaci, která zmizela. Vypráví o národu, který přežil - a o tvářích předků, které stále hledí."
    }
  }
};

const timelineByLanguage: Record<LanguageCode, TimelineItem[]> = {
  pl: [
    { date: "Około tysiąca lat temu", text: "Osadnicy ze wschodniej Polinezji docierają na Rapa Nui." },
    { date: "XI-XVII wiek", text: "Rozwój wielkich kompleksów ahu i tradycji rzeźbienia moai." },
    {
      date: "Późniejszy okres przedkolonialny",
      text: "Przemiany społeczne i religijne; rośnie znaczenie Orongo i ceremonii Tangata Manu."
    },
    { date: "1722", text: "Pierwsze dobrze udokumentowane spotkanie mieszkańców z wyprawą europejską." },
    {
      date: "1862-1863",
      text: "Niewolnicze najazdy i uprowadzenia; później epidemie oraz dramatyczny spadek liczby ludności."
    },
    { date: "1888", text: "Podpisanie dokumentów między przedstawicielami Chile i przywódcami Rapa Nui." },
    {
      date: "Od 1895 roku",
      text: "Niemal sześć dekad dominacji gospodarki owczarskiej i ograniczania mieszkańców na własnej ziemi."
    },
    { date: "1995", text: "Park Narodowy Rapa Nui zostaje wpisany na Listę światowego dziedzictwa UNESCO." },
    {
      date: "Dzisiaj",
      text: "Język, rzemiosło, muzyka, taniec, Kai-kai i pamięć genealogiczna pozostają żywymi elementami kultury Rapa Nui."
    }
  ],
  en: [
    { date: "About a thousand years ago", text: "Settlers from eastern Polynesia reach Rapa Nui." },
    { date: "11th-17th century", text: "Development of the great ahu complexes and the moai-carving tradition." },
    {
      date: "Later pre-colonial period",
      text: "Social and religious change; Orongo and the Tangata Manu ceremony grow in importance."
    },
    { date: "1722", text: "First well-documented encounter between the islanders and a European expedition." },
    {
      date: "1862-1863",
      text: "Slave raids and abductions; followed by epidemics and a dramatic fall in population."
    },
    { date: "1888", text: "Signing of documents between representatives of Chile and the leaders of Rapa Nui." },
    {
      date: "From 1895",
      text: "Nearly six decades of sheep-farming dominance and confinement of islanders on their own land."
    },
    { date: "1995", text: "Rapa Nui National Park is inscribed on the UNESCO World Heritage List." },
    {
      date: "Today",
      text: "Language, craft, music, dance, Kai-kai and genealogical memory remain living elements of Rapa Nui culture."
    }
  ],
  fr: [
    { date: "Il y a environ mille ans", text: "Des colons venus de Polynésie orientale atteignent Rapa Nui." },
    { date: "XIe-XVIIe siècle", text: "Essor des grands complexes d'ahu et de la tradition de sculpture des moai." },
    {
      date: "Période précoloniale tardive",
      text: "Mutations sociales et religieuses ; Orongo et la cérémonie du Tangata Manu gagnent en importance."
    },
    { date: "1722", text: "Première rencontre bien documentée entre les habitants et une expédition européenne." },
    {
      date: "1862-1863",
      text: "Razzias et enlèvements esclavagistes ; puis épidémies et chute démographique dramatique."
    },
    { date: "1888", text: "Signature de documents entre des représentants du Chili et les chefs de Rapa Nui." },
    {
      date: "À partir de 1895",
      text: "Près de six décennies de domination de l'économie ovine et de confinement des habitants sur leur propre terre."
    },
    { date: "1995", text: "Le parc national de Rapa Nui est inscrit sur la liste du patrimoine mondial de l'UNESCO." },
    {
      date: "Aujourd'hui",
      text: "La langue, l'artisanat, la musique, la danse, le Kai-kai et la mémoire généalogique demeurent des éléments vivants de la culture de Rapa Nui."
    }
  ],
  es: [
    { date: "Hace aproximadamente mil años", text: "Colonos de la Polinesia oriental llegan a Rapa Nui." },
    { date: "Siglos XI-XVII", text: "Desarrollo de los grandes complejos de ahu y de la tradición de tallar moáis." },
    {
      date: "Período precolonial tardío",
      text: "Transformaciones sociales y religiosas; crece la importancia de Orongo y de la ceremonia del Tangata Manu."
    },
    { date: "1722", text: "Primer encuentro bien documentado entre los habitantes y una expedición europea." },
    {
      date: "1862-1863",
      text: "Razias y secuestros esclavistas; después, epidemias y un descenso demográfico dramático."
    },
    { date: "1888", text: "Firma de documentos entre representantes de Chile y los líderes de Rapa Nui." },
    {
      date: "Desde 1895",
      text: "Casi seis décadas de dominio de la economía ovina y de confinamiento de los habitantes en su propia tierra."
    },
    { date: "1995", text: "El Parque Nacional Rapa Nui es inscrito en la Lista del Patrimonio Mundial de la UNESCO." },
    {
      date: "Hoy",
      text: "La lengua, el artesanado, la música, la danza, el Kai-kai y la memoria genealógica siguen siendo elementos vivos de la cultura de Rapa Nui."
    }
  ],
  de: [
    { date: "Vor etwa tausend Jahren", text: "Siedler aus Ostpolynesien erreichen Rapa Nui." },
    { date: "11.-17. Jahrhundert", text: "Entwicklung der großen Ahu-Komplexe und der Moai-Schnitztradition." },
    {
      date: "Späte vorkoloniale Zeit",
      text: "Gesellschaftliche und religiöse Umbrüche; Orongo und die Tangata-Manu-Zeremonie gewinnen an Bedeutung."
    },
    { date: "1722", text: "Erste gut dokumentierte Begegnung der Inselbewohner mit einer europäischen Expedition." },
    {
      date: "1862-1863",
      text: "Sklavenüberfälle und Verschleppungen; danach Epidemien und ein dramatischer Bevölkerungsrückgang."
    },
    { date: "1888", text: "Unterzeichnung von Dokumenten zwischen Vertretern Chiles und den Anführern Rapa Nuis." },
    {
      date: "Ab 1895",
      text: "Fast sechs Jahrzehnte der Vorherrschaft der Schafwirtschaft und der Einschränkung der Bewohner auf eigenem Land."
    },
    { date: "1995", text: "Der Nationalpark Rapa Nui wird in die UNESCO-Welterbeliste aufgenommen." },
    {
      date: "Heute",
      text: "Sprache, Handwerk, Musik, Tanz, Kai-kai und genealogische Erinnerung bleiben lebendige Elemente der Kultur Rapa Nuis."
    }
  ],
  cs: [
    { date: "Přibližně před tisíci lety", text: "Osadníci z východní Polynésie dorazili na Rapa Nui." },
    { date: "11.-17. století", text: "Rozvoj velkých komplexů ahu a tradice tesání moai." },
    {
      date: "Pozdní předkoloniální období",
      text: "Společenské a náboženské proměny; roste význam Orongo a obřadu Tangata Manu."
    },
    { date: "1722", text: "První dobře zdokumentované setkání obyvatel s evropskou výpravou." },
    {
      date: "1862-1863",
      text: "Otrokářské nájezdy a únosy; poté epidemie a dramatický pokles počtu obyvatel."
    },
    { date: "1888", text: "Podpis dokumentů mezi zástupci Chile a vůdci Rapa Nui." },
    {
      date: "Od roku 1895",
      text: "Téměř šest desetiletí nadvlády ovčího hospodářství a omezování obyvatel na vlastní zemi."
    },
    { date: "1995", text: "Národní park Rapa Nui je zapsán na Seznam světového dědictví UNESCO." },
    {
      date: "Dnes",
      text: "Jazyk, řemeslo, hudba, tanec, Kai-kai a genealogická paměť zůstávají živými prvky kultury Rapa Nui."
    }
  ]
};

const sourceMeta: SourceMeta[] = [
  { name: "UNESCO World Heritage Centre - Rapa Nui National Park", href: "https://whc.unesco.org/en/list/715/" },
  {
    name: "Museo de Rapa Nui - Los Ancestros de Rapa Nui",
    href: "https://www.museorapanui.gob.cl/los-ancestros-de-rapa-nui"
  },
  { name: "Museo de Rapa Nui - Conozca Rapa Nui", href: "https://www.museorapanui.gob.cl/conozca-rapa-nui" },
  {
    name: "Servicio Nacional del Patrimonio Cultural - Mata Moai",
    href: "https://www.patrimoniocultural.gob.cl/en/regional-museums/easter-island-anthropological-museum/mata-moai-moai-eye"
  },
  {
    name: "University of Hawai'i at Mānoa - Wayfinding and Navigation",
    href: "https://manoa.hawaii.edu/exploringourfluidearth/physical/navigation-and-transportation/wayfinding-and-navigation"
  },
  {
    name: "Nature, 2024 - Ancient Rapanui genomes reveal resilience",
    href: "https://www.nature.com/articles/s41586-024-07881-4"
  },
  {
    name: "Science Advances, 2024 - Agricultural production challenges the collapse hypothesis",
    href: "https://www.science.org/doi/10.1126/sciadv.ado1459"
  },
  {
    name: "Memoria Chilena - Expediciones esclavistas",
    href: "https://www.memoriachilena.gob.cl/602/w3-article-96631.html"
  },
  {
    name: "Memoria Chilena - Incorporándola al territorio chileno",
    href: "https://www.memoriachilena.gob.cl/602/w3-article-94620.html"
  },
  { name: "Memoria Chilena - Rapa Nui", href: "https://www.memoriachilena.gob.cl/602/w3-article-3524.html" },
  {
    name: "Museo de Rapa Nui, 2026 - Festival de Figuras Narradas Kai-kai",
    href: "https://www.museorapanui.gob.cl/noticias/1o-version-de-festival-de-figuras-narradas-kai-kai-isabel-pakarati-tepano"
  },
  {
    name: "Binghamton University, 2025 - Easter Island's statues actually walked",
    href: "https://www.binghamton.edu/news/story/5830/easter-islands-statues-actually-walked-and-physics-backs-it-up"
  }
];

const sourceScopeByLanguage: Record<LanguageCode, string[]> = {
  pl: [
    "Położenie, izolacja, moai, ahu, Rano Raraku, Orongo oraz skutki niewolnictwa, chorób i kolonizacji.",
    "Nawigacja, organizacja społeczna, mana, tapu, rolnictwo, ahu, moai, Tangata Manu.",
    "Liczba ahu i moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora i mana.",
    "Oko moai z białego koralu i czerwonej skały wulkanicznej, odnalezione przy Ahu Nau Nau.",
    "Polinezyjska nawigacja z użyciem słońca, gwiazd, fal, ptaków i chmur.",
    "Badania genomów dawnych Rapanui i krytyka prostego scenariusza przedkolonialnego załamania populacji.",
    "Skala kamiennych ogrodów i dawnych możliwości produkcji rolnej.",
    "Najazdy niewolnicze i szacunek około 1 500 uprowadzonych osób.",
    "Dokumenty z 1888 roku, Atamu Tekena i późniejsza gospodarka owczarska.",
    "Kontekst polinezyjski, izolacja, historia i kolekcje źródłowe.",
    "Kai-kai jako żywa praktyka przekazywania historii, języka, krajobrazów, genealogii i pamięci.",
    "Eksperymenty nad pionowym prowadzeniem moai za pomocą lin, przedstawiane jako silnie wsparta hipoteza."
  ],
  en: [
    "Location, isolation, moai, ahu, Rano Raraku, Orongo, and the effects of slavery, disease and colonisation.",
    "Navigation, social organisation, mana, tapu, agriculture, ahu, moai, Tangata Manu.",
    "Number of ahu and moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora and mana.",
    "The moai eye of white coral and red volcanic rock, found at Ahu Nau Nau.",
    "Polynesian navigation using the sun, stars, swells, birds and clouds.",
    "Research on ancient Rapanui genomes and a critique of the simple pre-colonial population-collapse scenario.",
    "The scale of stone gardens and past agricultural production capacity.",
    "Slave raids and an estimate of around 1,500 people abducted.",
    "The 1888 documents, Atamu Tekena, and the later sheep-farming economy.",
    "Polynesian context, isolation, history and source collections.",
    "Kai-kai as a living practice of passing on history, language, landscapes, genealogy and memory.",
    "Experiments on walking moai upright using ropes, presented as a strongly supported hypothesis."
  ],
  fr: [
    "Localisation, isolement, moai, ahu, Rano Raraku, Orongo, ainsi que les effets de l'esclavage, des maladies et de la colonisation.",
    "Navigation, organisation sociale, mana, tapu, agriculture, ahu, moai, Tangata Manu.",
    "Nombre d'ahu et de moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora et mana.",
    "L'œil de moai en corail blanc et roche volcanique rouge, retrouvé près d'Ahu Nau Nau.",
    "Navigation polynésienne utilisant le soleil, les étoiles, la houle, les oiseaux et les nuages.",
    "Recherches sur les génomes des anciens Rapanui et critique du scénario simple d'effondrement précolonial de la population.",
    "Ampleur des jardins de pierre et des capacités agricoles anciennes.",
    "Razzias esclavagistes et estimation d'environ 1 500 personnes enlevées.",
    "Documents de 1888, Atamu Tekena et l'économie ovine qui suivit.",
    "Contexte polynésien, isolement, histoire et collections de sources.",
    "Le Kai-kai comme pratique vivante de transmission de l'histoire, de la langue, des paysages, de la généalogie et de la mémoire.",
    "Expériences sur le déplacement vertical des moai au moyen de cordes, présentées comme une hypothèse fortement étayée."
  ],
  es: [
    "Ubicación, aislamiento, moáis, ahu, Rano Raraku, Orongo, y los efectos de la esclavitud, las enfermedades y la colonización.",
    "Navegación, organización social, mana, tapu, agricultura, ahu, moáis, Tangata Manu.",
    "Número de ahu y moáis, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora y mana.",
    "El ojo de moái de coral blanco y roca volcánica roja, hallado junto a Ahu Nau Nau.",
    "Navegación polinesia mediante el sol, las estrellas, el oleaje, las aves y las nubes.",
    "Investigaciones sobre genomas de antiguos rapanui y crítica del escenario simple de colapso poblacional precolonial.",
    "Escala de los jardines de piedra y capacidad agrícola en el pasado.",
    "Razias esclavistas y estimación de cerca de 1.500 personas secuestradas.",
    "Documentos de 1888, Atamu Tekena y la posterior economía ganadera.",
    "Contexto polinesio, aislamiento, historia y colecciones de fuentes.",
    "El Kai-kai como práctica viva de transmisión de historia, lengua, paisajes, genealogía y memoria.",
    "Experimentos sobre el desplazamiento vertical de los moáis mediante cuerdas, presentados como una hipótesis firmemente respaldada."
  ],
  de: [
    "Lage, Isolation, Moai, Ahu, Rano Raraku, Orongo sowie die Folgen von Sklaverei, Krankheiten und Kolonisierung.",
    "Navigation, gesellschaftliche Organisation, mana, tapu, Landwirtschaft, Ahu, Moai, Tangata Manu.",
    "Anzahl der Ahu und Moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora und mana.",
    "Das Moai-Auge aus weißem Korallen und roter Vulkangesteinsschlacke, gefunden bei Ahu Nau Nau.",
    "Polynesische Navigation mithilfe von Sonne, Sternen, Dünung, Vögeln und Wolken.",
    "Forschung zu Genomen alter Rapanui und Kritik am einfachen Szenario eines vorkolonialen Bevölkerungskollapses.",
    "Umfang der Steingärten und früherer landwirtschaftlicher Produktionsmöglichkeiten.",
    "Sklavenüberfälle und die Schätzung von rund 1.500 verschleppten Menschen.",
    "Dokumente von 1888, Atamu Tekena und die spätere Schafwirtschaft.",
    "Polynesischer Kontext, Isolation, Geschichte und Quellensammlungen.",
    "Kai-kai als lebendige Praxis der Weitergabe von Geschichte, Sprache, Landschaften, Genealogie und Erinnerung.",
    "Experimente zum aufrechten Fortbewegen der Moai mittels Seilen, vorgestellt als gut gestützte Hypothese."
  ],
  cs: [
    "Poloha, izolace, moai, ahu, Rano Raraku, Orongo a dopady otroctví, nemocí a kolonizace.",
    "Navigace, společenská organizace, mana, tapu, zemědělství, ahu, moai, Tangata Manu.",
    "Počet ahu a moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora a mana.",
    "Oko moai z bílého korálu a červené sopečné strusky, nalezené u Ahu Nau Nau.",
    "Polynéská navigace pomocí slunce, hvězd, vln, ptáků a mraků.",
    "Výzkum genomů dávných Rapanuiů a kritika jednoduchého scénáře předkoloniálního zhroucení populace.",
    "Rozsah kamenných zahrad a dávných možností zemědělské produkce.",
    "Otrokářské nájezdy a odhad asi 1 500 unesených osob.",
    "Dokumenty z roku 1888, Atamu Tekena a pozdější ovčí hospodářství.",
    "Polynéský kontext, izolace, historie a sbírky pramenů.",
    "Kai-kai jako živá praxe předávání historie, jazyka, krajin, genealogie a paměti.",
    "Experimenty se svislým přesunem moai pomocí lan, prezentované jako silně podložená hypotéza."
  ]
};

function getLocalizedSources(language: LanguageCode): SourceItem[] {
  const scopes = sourceScopeByLanguage[language] ?? sourceScopeByLanguage.pl;
  return sourceMeta.map((meta, i) => ({ ...meta, scope: scopes[i] ?? sourceScopeByLanguage.pl[i] }));
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function SceneImage({ image }: { image: StoryImage }) {
  if (!image.src) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(160deg,#050b10,#02060a_55%,#000)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(184,150,72,0.10),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(184,150,72,0.07),transparent_42%)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16]"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path d="M -5 78 C 20 65, 40 82, 62 60 S 95 40, 108 55" stroke="#b89648" strokeWidth="0.3" fill="none" />
          <path d="M -5 42 C 25 56, 48 30, 70 42 S 100 20, 108 30" stroke="#b89648" strokeWidth="0.2" fill="none" />
        </svg>
      </div>
    );
  }

  const imagePosition = {
    "--story-desktop-position": image.objectPosition ?? "center center",
    "--story-mobile-position": image.mobileObjectPosition ?? image.objectPosition ?? "center center"
  } as CSSProperties;

  return (
    <Image
      src={image.src}
      alt={image.alt ?? ""}
      fill
      loading="lazy"
      sizes="100vw"
      className="rapa-nui-story-image object-cover"
      style={imagePosition}
    />
  );
}

function Chapter({ chapter, index }: { chapter: StoryChapter; index: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const isDarkInterlude = chapter.image.tone === "dark";
  const alignRight = chapter.alignOverride ? chapter.alignOverride === "right" : index % 2 === 1;
  const contentAlign = alignRight ? "lg:ml-auto" : "";
  const gradient = chapter.softOverlay
    ? alignRight
      ? "bg-[linear-gradient(270deg,rgba(2,8,13,0.58),rgba(2,8,13,0.28)_28%,rgba(2,8,13,0.02)_50%),linear-gradient(180deg,rgba(2,8,13,0.04),rgba(2,8,13,0.38))]"
      : "bg-[linear-gradient(90deg,rgba(2,8,13,0.58),rgba(2,8,13,0.3)_30%,rgba(2,8,13,0.02)_50%),linear-gradient(180deg,rgba(2,8,13,0.04),rgba(2,8,13,0.38))]"
    : alignRight
      ? "bg-[linear-gradient(270deg,rgba(2,8,13,0.92),rgba(2,8,13,0.52)_34%,rgba(2,8,13,0.06)_58%),linear-gradient(180deg,rgba(2,8,13,0.1),rgba(2,8,13,0.66))]"
      : "bg-[linear-gradient(90deg,rgba(2,8,13,0.92),rgba(2,8,13,0.55)_36%,rgba(2,8,13,0.06)_58%),linear-gradient(180deg,rgba(2,8,13,0.1),rgba(2,8,13,0.66))]";
  const textShadow = chapter.softOverlay ? "[text-shadow:0_2px_20px_rgba(0,0,0,0.9)]" : "";

  return (
    <article id={`rapa-nui-${chapter.id}`} className="relative overflow-hidden border-y border-white/10 bg-[#02080d] text-white">
      <motion.div
        initial={false}
        whileInView={reduceMotion || isDarkInterlude ? undefined : { scale: 1.01 }}
        viewport={{ once: false, amount: 0.28 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <SceneImage image={chapter.image} />
      </motion.div>
      <div className={`absolute inset-0 ${isDarkInterlude ? "bg-black/72" : gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(184,150,72,0.11),transparent_32%)]" />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 select-none font-serif text-[26vw] font-bold leading-none text-white/[0.045] sm:text-[20vw] ${
          alignRight ? "left-2 sm:left-6" : "right-2 sm:right-6"
        }`}
      >
        {chapter.number}
      </span>

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-end px-6 py-16 sm:px-10 sm:py-24 lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-[76ch] ${contentAlign} ${textShadow}`}
        >
          <div className="border-l border-gold/55 pl-5 sm:pl-8">
            <p className="section-kicker text-gold">{chapter.eyebrow}</p>
            <h3 className="mt-5 text-balance font-serif text-[clamp(2.15rem,4.45vw,4.35rem)] font-semibold leading-[1.04] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
              {chapter.title}
            </h3>
          </div>
          <blockquote className="mt-8 border-y border-gold/25 py-5 font-serif text-2xl font-semibold leading-tight text-[#f7e6bd] sm:text-3xl">
            {chapter.quote}
          </blockquote>
          <div className="mt-8 space-y-5 text-base leading-8 text-white/78 sm:text-lg sm:leading-9">
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {chapter.aside?.variant === "disclaimer" ? (
            <aside className="mt-8 flex gap-3 border border-white/18 bg-white/[0.04] p-5 text-sm leading-7 text-white/65 backdrop-blur sm:text-base">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/30 text-[11px] font-bold text-white/70"
              >
                i
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">{chapter.aside.title}</p>
                <p className="mt-3">{chapter.aside.body}</p>
              </div>
            </aside>
          ) : chapter.aside ? (
            <aside className="mt-8 border border-gold/30 bg-black/34 p-5 text-sm leading-7 text-[#f7e6bd] backdrop-blur sm:text-base">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{chapter.aside.title}</p>
              <p className="mt-3">{chapter.aside.body}</p>
            </aside>
          ) : null}
          <p className="mt-8 border-l border-white/20 pl-5 font-serif text-xl font-semibold leading-8 text-white sm:text-2xl">
            {chapter.endLine}
          </p>
          <p className="mt-10 font-serif text-3xl font-semibold text-gold/82">{chapter.number}</p>
        </motion.div>
      </div>
    </article>
  );
}

function Timeline({ ui, timeline }: { ui: StoryUi; timeline: TimelineItem[] }) {
  return (
    <section className="relative bg-[#061018] px-6 py-20 text-white sm:px-10 sm:py-24" aria-labelledby="rapa-nui-timeline">
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker">RAPA NUI</p>
        <h3 id="rapa-nui-timeline" className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.8rem)] font-semibold">
          {ui.timelineTitle}
        </h3>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {timeline.map((item) => (
            <li
              key={item.date}
              tabIndex={0}
              className="border border-white/12 bg-white/[0.035] p-5 outline-none transition focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/45"
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold">{item.date}</p>
              <p className="mt-3 text-base leading-7 text-white/75">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Sources({ ui, sources }: { ui: StoryUi; sources: SourceItem[] }) {
  return (
    <section className="relative bg-[#02080d] px-6 pb-24 text-white sm:px-10" aria-labelledby="rapa-nui-sources">
      <div className="mx-auto max-w-7xl border-t border-gold/30 pt-10">
        <details className="group border border-white/14 bg-white/[0.025]">
          <summary
            id="rapa-nui-sources"
            className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left font-serif text-2xl font-semibold text-white outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:px-7 sm:text-3xl"
          >
            <span>{ui.sourcesTitle}</span>
            <span className="text-gold transition group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="border-t border-white/10 px-5 pb-7 pt-6 sm:px-7">
            <p className="max-w-4xl text-base leading-8 text-white/74 sm:text-lg">{ui.sourcesSummary}</p>
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {sources.map((source) => (
                <li key={source.href} className="border-l border-gold/45 bg-black/22 p-5">
                  <p className="font-semibold leading-7 text-white">{source.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{source.scope}</p>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-gold transition hover:text-[#f7e6bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {ui.sourceLinkLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}

export function RapaNuiStorySection() {
  const { language } = useI18n();
  const ui = uiByLanguage[language] ?? uiByLanguage.pl;
  const opening = openingByLanguage[language] ?? openingByLanguage.pl;
  const chapters = getLocalizedChapters(language);
  const timeline = timelineByLanguage[language] ?? timelineByLanguage.pl;
  const sources = getLocalizedSources(language);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="rapa-nui-story"
      className="rapa-nui-story multilingual-layout relative overflow-hidden bg-[#02080d] text-white"
      aria-labelledby="rapa-nui-story-title"
    >
      <article className="relative min-h-[94svh] overflow-hidden">
        <motion.div
          initial={false}
          whileInView={reduceMotion ? undefined : { scale: 1.01 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images.island}
            alt={opening.imageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="rapa-nui-story-image object-cover"
            style={
              {
                "--story-desktop-position": "center center",
                "--story-mobile-position": "52% center"
              } as CSSProperties
            }
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,13,0.92),rgba(2,8,13,0.55)_36%,rgba(2,8,13,0.06)_58%),linear-gradient(180deg,rgba(2,8,13,0.1),rgba(2,8,13,0.66))]" />
        <BrandBackdrop />
        <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-7xl items-end px-6 py-16 sm:px-10 sm:py-24 lg:items-center">
          <div className="max-w-[70ch]">
            <p className="section-kicker text-gold">{opening.eyebrow}</p>
            <h2
              id="rapa-nui-story-title"
              className="mt-5 max-w-[14ch] text-balance font-serif text-[clamp(3rem,6.1vw,5.8rem)] font-semibold leading-[0.98] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]"
            >
              {opening.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-white/78 sm:text-xl sm:leading-9">
              {opening.lead.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-9 border-l border-gold/65 pl-5 font-serif text-2xl font-semibold leading-tight text-[#f7e6bd] sm:text-4xl">
              {opening.quote}
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/55">
              <span className="font-bold uppercase tracking-[0.2em] text-white/40">{ui.sourcesTitle}:</span>
              <span>UNESCO</span>
              <span aria-hidden="true">·</span>
              <span>Museo de Rapa Nui</span>
              <span aria-hidden="true">·</span>
              <span>Nature, 2024</span>
              <a
                href="#rapa-nui-sources"
                className="inline-flex items-center gap-1 font-bold uppercase tracking-[0.2em] text-gold transition hover:text-[#f7e6bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {ui.sourceLinkLabel}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </article>

      {chapters.map((chapter, index) => (
        <Chapter key={chapter.id} chapter={chapter} index={index} />
      ))}

      <Timeline ui={ui} timeline={timeline} />
      <Sources ui={ui} sources={sources} />

      <section className="relative overflow-hidden bg-[#02080d] px-6 pb-24 text-white sm:px-10 sm:pb-28">
        <div className="mx-auto max-w-7xl border-t border-gold/35 pt-12">
          <p className="section-kicker text-gold">{ui.visualNoteLabel}</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/58">{ui.visualNoteBody}</p>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-gold/82">{ui.transitionLabel}</p>
          <p className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.2rem,4.6vw,4.8rem)] font-semibold leading-[1.04] text-white">
            {ui.bridgeLine}
          </p>
          <a
            href="#przebudzenie-moai"
            className="mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold/82 transition hover:text-[#f7e6bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span>{ui.nextSectionLabel}</span>
            <span aria-hidden="true" className="text-base">
              &darr;
            </span>
          </a>
        </div>
      </section>

      <style jsx global>{`
        .rapa-nui-story-image {
          object-position: var(--story-mobile-position);
        }

        @media (min-width: 768px) {
          .rapa-nui-story-image {
            object-position: var(--story-desktop-position);
          }
        }
      `}</style>
    </section>
  );
}
