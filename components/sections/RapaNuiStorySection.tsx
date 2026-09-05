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

type TimelineItem = {
  date: string;
  text: string;
};

type SourceItem = {
  name: string;
  scope: string;
  href: string;
};

type StoryUi = {
  translationNotice?: string;
  timelineTitle: string;
  sourcesTitle: string;
  sourcesSummary: string;
  sourceLinkLabel: string;
  visualNoteLabel: string;
  transitionLabel: string;
  nextSectionLabel: string;
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
    transitionLabel: "Przejście do istniejącej sekcji",
    nextSectionLabel: "Zobacz: Przebudzenie Moai"
  },
  en: {
    translationNotice: "Full editorial translation is pending. This section currently shows the canonical Polish narrative.",
    timelineTitle: "Timeline",
    sourcesTitle: "Sources and historical note",
    sourcesSummary:
      "The narrative is based on UNESCO, Museo de Rapa Nui, the National Library of Chile and contemporary archaeological and genetic research. Where oral tradition and scholarship describe the past in different languages, the text keeps those forms of evidence distinct.",
    sourceLinkLabel: "Open source",
    visualNoteLabel: "Visual note",
    transitionLabel: "Transition to the existing section",
    nextSectionLabel: "Next: Awakening of the Moai"
  },
  fr: {
    translationNotice:
      "La traduction éditoriale complète est en préparation. Cette section affiche actuellement la narration polonaise canonique.",
    timelineTitle: "Chronologie",
    sourcesTitle: "Sources et note historique",
    sourcesSummary:
      "Le récit s'appuie sur l'UNESCO, le Museo de Rapa Nui, la Bibliothèque nationale du Chili et des recherches archéologiques et génétiques contemporaines. Lorsque la tradition orale et la recherche décrivent le passé avec des langages différents, le texte distingue consciemment ces formes de témoignage.",
    sourceLinkLabel: "Ouvrir la source",
    visualNoteLabel: "Note visuelle",
    transitionLabel: "Transition vers la section existante",
    nextSectionLabel: "Suivant : Réveil du Moai"
  },
  es: {
    translationNotice:
      "La traducción editorial completa está pendiente. Esta sección muestra actualmente la narrativa canónica en polaco.",
    timelineTitle: "Cronología",
    sourcesTitle: "Fuentes y nota histórica",
    sourcesSummary:
      "La narración se basa en materiales de UNESCO, Museo de Rapa Nui, Biblioteca Nacional de Chile e investigaciones arqueológicas y genéticas contemporáneas. Cuando la tradición oral y la ciencia describen el pasado con lenguajes distintos, el texto diferencia conscientemente ambos tipos de testimonio.",
    sourceLinkLabel: "Abrir fuente",
    visualNoteLabel: "Nota visual",
    transitionLabel: "Transición a la sección existente",
    nextSectionLabel: "Siguiente: El Despertar del Moai"
  },
  de: {
    translationNotice:
      "Die vollständige redaktionelle Übersetzung ist in Vorbereitung. Dieser Abschnitt zeigt derzeit die kanonische polnische Fassung.",
    timelineTitle: "Zeitleiste",
    sourcesTitle: "Quellen und historische Notiz",
    sourcesSummary:
      "Die Erzählung basiert auf Materialien der UNESCO, des Museo de Rapa Nui, der Chilenischen Nationalbibliothek sowie aktueller archäologischer und genetischer Forschung. Wo mündliche Überlieferung und Wissenschaft die Vergangenheit in unterschiedlichen Sprachen beschreiben, unterscheidet der Text beide Zeugnisformen bewusst.",
    sourceLinkLabel: "Quelle öffnen",
    visualNoteLabel: "Visuelle Notiz",
    transitionLabel: "Übergang zum bestehenden Abschnitt",
    nextSectionLabel: "Weiter: Erwachen des Moai"
  },
  cs: {
    translationNotice: "Úplný redakční překlad se připravuje. Tato sekce nyní zobrazuje kanonické polské znění.",
    timelineTitle: "Časová osa",
    sourcesTitle: "Zdroje a historická poznámka",
    sourcesSummary:
      "Vyprávění vychází z materiálů UNESCO, Museo de Rapa Nui, Chilské národní knihovny a současných archeologických a genetických výzkumů. Tam, kde ústní tradice a věda popisují minulost odlišnými jazyky, text oba druhy svědectví vědomě rozlišuje.",
    sourceLinkLabel: "Otevřít zdroj",
    visualNoteLabel: "Vizuální poznámka",
    transitionLabel: "Přechod do stávající sekce",
    nextSectionLabel: "Dále: Probuzení Moai"
  }
};

const opening = {
  eyebrow: "RAPA NUI - WYSPA ŻYWYCH PRZODKÓW",
  title: "Wyspa, która nauczyła kamień patrzeć",
  lead: [
    "To nie jest historia \"zaginionej cywilizacji\". To historia polinezyjskich żeglarzy, rodzin, rolników, rybaków, rzeźbiarzy i strażników pamięci - oraz ich potomków, którzy nadal nazywają Rapa Nui domem.",
    "Na jednej z najbardziej odizolowanych zamieszkanych wysp świata ludzie stworzyli setki ceremonialnych platform i niemal dziewięćset moai. Jeszcze większym osiągnięciem było jednak to, że przez stulecia potrafili zbudować wspólnotę, przystosować się do wymagającego środowiska, przetrwać niewolnicze najazdy, epidemie i kolonialną eksploatację, a następnie przekazać swoją kulturę kolejnym pokoleniom."
  ],
  quote: "Zanim kamień otrzymał twarz, człowiek musiał pokonać ocean."
};

const chapters: StoryChapter[] = [
  {
    id: "ocean",
    number: "01",
    eyebrow: "POCZĄTEK",
    title: "Najpierw był ocean",
    quote: "Dla pierwszych żeglarzy Pacyfik nie był pustką. Był drogą.",
    paragraphs: [
      "Rapa Nui leży około 3 700 kilometrów od wybrzeży kontynentalnego Chile. Na mapie wygląda jak niewielki punkt otoczony niemal bezkresną wodą. Dla ludzi, którzy dotarli tu jako pierwsi, nie istniały porty, mapy drukowane ani możliwość wezwania pomocy. Była tylko wiedza: położenie słońca i gwiazd, kierunek wiatrów i fal, lot morskich ptaków, kształt chmur oraz pamięć tras przekazywana przez kolejne pokolenia polinezyjskich nawigatorów.",
      "Około tysiąca lat temu niewielka grupa osadników ze wschodniej Polinezji osiągnęła tę samotną wulkaniczną wyspę. Nie był to przypadkowy dryf, lecz część jednego z największych przedsięwzięć żeglarskich w dziejach ludzkości - zasiedlania ogromnego obszaru Pacyfiku przez ludzi, którzy potrafili odnajdywać ląd daleko poza linią horyzontu.",
      "Tradycja ustna Rapa Nui wiąże początek wspólnoty z ariki Hotu Matu'a i ojczyzną nazywaną Hiva. Nie wszystkie elementy tej opowieści można przełożyć na współczesną mapę albo dokładną datę. Jej znaczenie jest jednak głębsze niż kronikarski zapis: przechowuje pamięć o podróży, pochodzeniu, przywództwie i chwili, w której ocean przestał być wyłącznie drogą, a stał się granicą nowego domu."
    ],
    endLine: "Na końcu tej podróży nie czekało imperium. Czekała ziemia, na której wszystko trzeba było stworzyć od początku.",
    image: {
      src: images.orongo,
      alt: "Artystyczna wizualizacja bezkresnego Pacyfiku widzianego z klifów Rapa Nui.",
      objectPosition: "38% 62%",
      mobileObjectPosition: "30% 68%",
      tone: "deep"
    }
  },
  {
    id: "adaptacja",
    number: "02",
    eyebrow: "ADAPTACJA",
    title: "Największym monumentem było przetrwanie",
    quote: "Zanim powstały moai, trzeba było zbudować życie.",
    paragraphs: [
      "Rapa Nui nie dawała swoim mieszkańcom nieograniczonych zasobów. Izolacja oznaczała, że każdy błąd mógł mieć konsekwencje dla całej wspólnoty. Gleba była wystawiona na wiatr, okresowe niedobory wody i erozję, a ocean - choć zapewniał pożywienie - nie zawsze pozwalał bezpiecznie wypłynąć. Przetrwanie wymagało obserwacji, cierpliwości i technologii dostosowanej do miejsca.",
      "Mieszkańcy tworzyli kamienne ogrody i osłony typu manavai. Rozłożone na ziemi fragmenty skał pomagały zatrzymywać wilgoć, ograniczały wpływ wiatru i stabilizowały temperaturę wokół upraw. Kamienne kręgi chroniły rośliny, a wiedza o glebie, porach roku, wodzie, rybołówstwie i przechowywaniu żywności była równie ważna jak umiejętność rzeźbienia posągów. Krajobraz wyspy nie był więc biernym tłem. Był współtworzony przez ludzi i ich codzienną pracę.",
      "Społeczeństwo organizowało się wokół rodów i terytoriów. Genealogia określała przynależność, obowiązki i relację z ziemią. Pojęcia mana - duchowej siły i autorytetu - oraz tapu - zasad wyznaczających to, co chronione, święte lub ograniczone - porządkowały nie tylko religię, lecz także życie społeczne. Wiedza nie znajdowała się w książkach. Żyła w pamięci ludzi, w nazwach miejsc, pieśniach, opowieściach, gestach, rzemiośle i praktykach wykonywanych wspólnie.",
      "Właśnie dlatego największym osiągnięciem Rapa Nui nie była pojedyncza monumentalna figura. Był nim system życia zdolny utrzymać wspólnotę przez stulecia w jednym z najbardziej odizolowanych miejsc na Ziemi. Najnowsze badania nad dawnym rolnictwem i genomami mieszkańców dodatkowo podważają popularną opowieść o prostym, samobójczym \"ekocydzie\". Pokazują społeczeństwo mniejsze, bardziej elastyczne i odporniejsze, niż przez lata przedstawiała je zachodnia popkultura."
    ],
    endLine: "Dopiero wspólnota, która nauczyła się utrzymywać życie, mogła nadać trwałą formę pamięci o swoich przodkach.",
    image: {
      src: images.people,
      alt: "Artystyczna wizualizacja starszego mężczyzny przekazującego dziecku tradycję pracy ze sznurkiem inspirowaną Kai-kai.",
      objectPosition: "63% center",
      mobileObjectPosition: "67% center",
      tone: "warm"
    }
  },
  {
    id: "ahu-moai",
    number: "03",
    eyebrow: "AHU I MOAI",
    title: "Przodkowie pozostali wśród żywych",
    quote: "Moai nie patrzyły w bezkres. Patrzyły na swoich ludzi.",
    paragraphs: [
      "Na Rapa Nui powstało ponad trzysta ahu - kamiennych platform ceremonialnych powiązanych z rodami, pamięcią, obrzędami i pochówkami. Na wielu z nich ustawiano moai: monumentalne postacie przedstawiające przodków lub osoby o szczególnym znaczeniu. Posąg nie był dekoracją ani anonimowym \"idolem\". Łączył żyjących z genealogią, terytorium i autorytetem tych, którzy odeszli.",
      "Większość moai ustawionych na ahu odwracała się plecami do oceanu i kierowała twarz ku osadom, domom oraz ziemi uprawianej przez potomków. Ich obecność mówiła: przodkowie nadal są częścią wspólnoty. Czuwają nad miejscem, z którego wyrósł ród, potwierdzają jego więź z ziemią i przypominają, że teraźniejszość nie istnieje bez pamięci.",
      "Na wyspie zinwentaryzowano niemal dziewięćset moai i ponad trzysta platform ceremonialnych. Różnią się rozmiarem, proporcjami, stopniem ukończenia i historią. Nie były produkowane jak identyczne monumenty jednego państwa. Powstawały w świecie wielu grup rodzinnych i lokalnych centrów ceremonialnych. Każda figura należała do konkretnego krajobrazu i konkretnej sieci relacji.",
      "Dlatego pytanie \"kto zbudował moai?\" ma prostą, choć często pomijaną odpowiedź: zbudowali je przodkowie dzisiejszych Rapa Nui. Nie obca cywilizacja, nie przybysze z innego kontynentu i nie mityczna technologia. Ludzie posiadający wiedzę o kamieniu, równowadze, linach, organizacji pracy i znaczeniu wspólnego celu."
    ],
    endLine: "Moai były kamiennymi twarzami pamięci. Ich narodziny zaczynały się w jednym niezwykłym miejscu.",
    image: {
      src: images.ranoRaraku,
      alt: "Artystyczna wizualizacja zboczy Rano Raraku z moai osadzonymi w wulkanicznym krajobrazie.",
      objectPosition: "58% center",
      mobileObjectPosition: "64% center",
      tone: "deep"
    }
  },
  {
    id: "rano-raraku",
    number: "04",
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
      body: "Badacze nadal dyskutują o technikach transportu. Eksperymenty wykazały jednak, że moai o odpowiednim środku ciężkości można prowadzić pionowo za pomocą lin i rytmicznego kołysania - zgodnie z rapanujską tradycją mówiącą, że posągi szły.",
      variant: "note"
    },
    endLine: "Droga kończyła się na ahu. Lecz nawet ustawiony posąg nie był jeszcze w pełni żywą twarzą.",
    image: {
      src: images.ranoRaraku,
      alt: "Artystyczna wizualizacja zboczy Rano Raraku z moai osadzonymi w wulkanicznym krajobrazie.",
      objectPosition: "72% center",
      mobileObjectPosition: "76% center",
      tone: "deep"
    }
  },
  {
    id: "mana",
    number: "05",
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
      body: "Dostarczony asset jest artystyczną interpretacją. Widoczne oczy nie są podpisywane jako autentyczne muzealne znalezisko. Fakt historyczny o oku z Ahu Nau Nau przekazujemy w tekście.",
      variant: "disclaimer"
    },
    endLine: "Z czasem język sacrum zaczął się zmieniać. Rapa Nui weszła w nową epokę - ale nie przestała być sobą.",
    image: {
      src: images.ancestorEye,
      alt: "Artystyczna wizualizacja twarzy moai oraz symbolicznego motywu oczu.",
      objectPosition: "42% center",
      mobileObjectPosition: "48% center",
      tone: "deep"
    },
    alignOverride: "right",
    softOverlay: true
  },
  {
    id: "orongo",
    number: "06",
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
    endLine: "Wyspa przetrwała stulecia izolacji. Niemal nie przetrwała spotkania ze światem, który przybył po ludzi, ziemię i zysk.",
    image: {
      src: images.orongo,
      alt: "Artystyczna wizualizacja kamiennych zabudowań Orongo na klifie nad Pacyfikiem.",
      objectPosition: "center center",
      mobileObjectPosition: "42% center",
      tone: "deep"
    }
  },
  {
    id: "zewnatrz",
    number: "07",
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
    endLine:
      "Pozostało niewiele ponad sto osób. Wystarczająco mało, by świat uznał kulturę za ginącą. Wystarczająco dużo, by ocalić jej ciągłość.",
    image: { tone: "dark" }
  },
  {
    id: "dzisiaj",
    number: "08",
    eyebrow: "RAPA NUI DZISIAJ",
    title: "Naród, który przetrwał",
    quote: "Rapa Nui nie jest ruiną. Jest domem.",
    paragraphs: [
      "Potomkowie dawnych mieszkańców nadal żyją na wyspie. Podtrzymują i rewitalizują język rapanujski, przywracają znaczenie nazwom miejsc, tworzą rzeźby, śpiewają, tańczą, opowiadają genealogie i podejmują działania na rzecz ochrony dziedzictwa. Moai nie są dla nich anonimową atrakcją archeologiczną. Są częścią krajobrazu przodków, pamięci rodowej oraz współczesnej rozmowy o tożsamości, ziemi i prawie do decydowania o własnym dziedzictwie.",
      "Jednym z pięknych przykładów żywej ciągłości jest Kai-kai. Za pomocą nici układanej pomiędzy palcami powstają figury, którym towarzyszy recytacja pāta'u-ta'u. W ten sposób można przekazywać historie, krajobrazy, wydarzenia, mitologię, genealogie i pamięć zbiorową. To, co dla przypadkowego obserwatora wygląda jak zabawa sznurkiem, jest nośnikiem języka i wielopokoleniowego doświadczenia.",
      "W 2026 roku na Rapa Nui zorganizowano festiwal figur narracyjnych Kai-kai poświęcony pamięci mistrzyni Isabel Pakarati Tepano. W wydarzeniu uczestniczyli przedstawiciele różnych pokoleń, prezentując opowieści w języku rapanujskim i hiszpańskim. Tak właśnie kultura trwa: nie jako zamrożony eksponat, lecz jako praktyka wykonywana rękami, głosem i pamięcią żyjących ludzi.",
      "Dlatego w tej sekcji nie wolno mówić o Rapa Nui wyłącznie w czasie przeszłym. Dzisiejsi mieszkańcy nie są przypisem do historii moai. Są potomkami ich twórców, opiekunami miejsc, artystami, badaczami, nauczycielami i gospodarzami wyspy. Opowieść nie kończy się wraz z ostatnim ustawionym posągiem ani z przybyciem Europejczyków. Trwa w rodzinach, języku i świadomym odzyskiwaniu własnego głosu."
    ],
    endLine:
      "RapaNuiPark nie opowiada o cywilizacji, która zniknęła. Opowiada o narodzie, który przetrwał - i o twarzach przodków, które nadal patrzą.",
    image: {
      src: images.livingTradition,
      alt: "Artystyczna wizualizacja starszego rzemieślnika przekazującego dziecku sztukę rzeźbienia, z moai w oddali.",
      objectPosition: "43% center",
      mobileObjectPosition: "38% center",
      tone: "warm"
    }
  }
];

const timeline: TimelineItem[] = [
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
];

const sources: SourceItem[] = [
  {
    name: "UNESCO World Heritage Centre - Rapa Nui National Park",
    scope: "Położenie, izolacja, moai, ahu, Rano Raraku, Orongo oraz skutki niewolnictwa, chorób i kolonizacji.",
    href: "https://whc.unesco.org/en/list/715/"
  },
  {
    name: "Museo de Rapa Nui - Los Ancestros de Rapa Nui",
    scope: "Nawigacja, organizacja społeczna, mana, tapu, rolnictwo, ahu, moai, Tangata Manu.",
    href: "https://www.museorapanui.gob.cl/los-ancestros-de-rapa-nui"
  },
  {
    name: "Museo de Rapa Nui - Conozca Rapa Nui",
    scope: "Liczba ahu i moai, Rano Raraku, Orongo, Ahu Nau Nau, aringa ora i mana.",
    href: "https://www.museorapanui.gob.cl/conozca-rapa-nui"
  },
  {
    name: "Servicio Nacional del Patrimonio Cultural - Mata Moai",
    scope: "Oko moai z białego koralu i czerwonej skały wulkanicznej, odnalezione przy Ahu Nau Nau.",
    href: "https://www.patrimoniocultural.gob.cl/en/regional-museums/easter-island-anthropological-museum/mata-moai-moai-eye"
  },
  {
    name: "University of Hawai'i at Mānoa - Wayfinding and Navigation",
    scope: "Polinezyjska nawigacja z użyciem słońca, gwiazd, fal, ptaków i chmur.",
    href: "https://manoa.hawaii.edu/exploringourfluidearth/physical/navigation-and-transportation/wayfinding-and-navigation"
  },
  {
    name: "Nature, 2024 - Ancient Rapanui genomes reveal resilience",
    scope: "Badania genomów dawnych Rapanui i krytyka prostego scenariusza przedkolonialnego załamania populacji.",
    href: "https://www.nature.com/articles/s41586-024-07881-4"
  },
  {
    name: "Science Advances, 2024 - Agricultural production challenges the collapse hypothesis",
    scope: "Skala kamiennych ogrodów i dawnych możliwości produkcji rolnej.",
    href: "https://www.science.org/doi/10.1126/sciadv.ado1459"
  },
  {
    name: "Memoria Chilena - Expediciones esclavistas",
    scope: "Najazdy niewolnicze i szacunek około 1 500 uprowadzonych osób.",
    href: "https://www.memoriachilena.gob.cl/602/w3-article-96631.html"
  },
  {
    name: "Memoria Chilena - Incorporándola al territorio chileno",
    scope: "Dokumenty z 1888 roku, Atamu Tekena i późniejsza gospodarka owczarska.",
    href: "https://www.memoriachilena.gob.cl/602/w3-article-94620.html"
  },
  {
    name: "Memoria Chilena - Rapa Nui",
    scope: "Kontekst polinezyjski, izolacja, historia i kolekcje źródłowe.",
    href: "https://www.memoriachilena.gob.cl/602/w3-article-3524.html"
  },
  {
    name: "Museo de Rapa Nui, 2026 - Festival de Figuras Narradas Kai-kai",
    scope: "Kai-kai jako żywa praktyka przekazywania historii, języka, krajobrazów, genealogii i pamięci.",
    href: "https://www.museorapanui.gob.cl/noticias/1o-version-de-festival-de-figuras-narradas-kai-kai-isabel-pakarati-tepano"
  },
  {
    name: "Binghamton University, 2025 - Easter Island's statues actually walked",
    scope: "Eksperymenty nad pionowym prowadzeniem moai za pomocą lin, przedstawiane jako silnie wsparta hipoteza.",
    href: "https://www.binghamton.edu/news/story/5830/easter-islands-statues-actually-walked-and-physics-backs-it-up"
  }
];

const visualNote =
  "Warstwa wizualna: artystyczne wizualizacje inspirowane krajobrazem i kulturą Rapa Nui, wygenerowane cyfrowo. Tekst historyczny opiera się na źródłach wymienionych w nocie.";

const bridgeLine = "Kiedy oczy wracają na swoje miejsce, kamień ponownie staje się spojrzeniem.";

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

function Timeline({ ui }: { ui: StoryUi }) {
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

function Sources({ ui }: { ui: StoryUi }) {
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
            alt="Artystyczna wizualizacja wulkanicznej wyspy Rapa Nui otoczonej wodami Pacyfiku."
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
            {ui.translationNotice ? (
              <p className="mb-7 border border-gold/25 bg-black/35 px-4 py-3 text-sm leading-6 text-[#f7e6bd]">
                {ui.translationNotice}
              </p>
            ) : null}
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

      <Timeline ui={ui} />
      <Sources ui={ui} />

      <section className="relative overflow-hidden bg-[#02080d] px-6 pb-24 text-white sm:px-10 sm:pb-28">
        <div className="mx-auto max-w-7xl border-t border-gold/35 pt-12">
          <p className="section-kicker text-gold">{ui.visualNoteLabel}</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/58">{visualNote}</p>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-gold/82">{ui.transitionLabel}</p>
          <p className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.2rem,4.6vw,4.8rem)] font-semibold leading-[1.04] text-white">
            {bridgeLine}
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
