export type SiteLanguage = "pl" | "en";
export type SiteRoute = "home" | "manifest" | "origins" | "archetypes" | "works" | "author";
export type NavigationRoute = Exclude<SiteRoute, "home">;

export const routes: Array<{ key: NavigationRoute; path: string }> = [
  { key: "manifest", path: "manifest" },
  { key: "origins", path: "origins" },
  { key: "archetypes", path: "archetypes" },
  { key: "works", path: "works" },
  { key: "author", path: "author" }
];

export const imagePath = "/images/aeromorphism/archetype-I-primary-form.png";

const primaryWorkImage = "/images/aeromorphism/archetype-I-primary-form.png";
const buddhaWorkImage = "/images/aeromorphism/buddha-contemplative-form.png";
const ganeshaWorkImage = "/images/aeromorphism/ganesha-symbolic-form.png";
const anubisWorkImage = "/images/aeromorphism/anubis-civilizational-form.png";
const pharaohWorkImage = "/images/aeromorphism/pharaoh-civilizational-form.png";
const dragonWorkImage = "/images/aeromorphism/dragon-energetic-form.png";

export const content = {
  pl: {
    lang: "pl-PL",
    brand: "AEROMORPHISM",
    brandLabel: "Aeromorfizm",
    creator: "Daniel Nowicki",
    creatorLine: "Daniel Nowicki — Twórca Aeromorfizmu",
    creatorManifest: "Daniel Nowicki — Author of the Aeromorphism Manifesto",
    title: "Aeromorfizm",
    seoTitle: "Aeromorfizm — nowy autorski nurt rzeźbiarski | Daniel Nowicki",
    seoDescription:
      "Aeromorfizm to autorski nurt rzeźbiarski stworzony przez Daniela Nowickiego, w którym materia, pustka, światło, powietrze i przestrzeń wspólnie budują formę.",
    locale: "pl_PL",
    nav: {
      manifest: "Manifest",
      origins: "Origins",
      archetypes: "Archetypes",
      works: "Works",
      author: "Author",
      language: "EN",
      menu: "Menu",
      close: "Zamknij"
    },
    hero: {
      kicker: "Daniel Nowicki / 2026",
      title: "AEROMORFIZM",
      subtitle: "FORMA, KTÓREJ CZĘŚCIĄ JEST POWIETRZE",
      lines: ["Rzeźbienie materią.", "Rzeźbienie przestrzenią.", "Rzeźbienie powietrzem."],
      imageAlt: "Archetyp I — Forma Pierwotna, aeromorficzna wizualizacja koncepcyjna Daniela Nowickiego",
      imageCaption: "Archetyp I — Forma Pierwotna / 2026 / Daniel Nowicki / Aeromorfizm / Wizualizacja koncepcyjna",
      primary: "Manifest",
      secondary: "Zobacz prace"
    },
    definition: {
      heading: "Definicja kanoniczna",
      quote:
        "Aeromorfizm jest współczesnym, autorskim nurtem rzeźbiarskim stworzonym przez Daniela Nowickiego, opartym na budowaniu rozpoznawalnej formy za pomocą otwartej, przestrzennej struktury, w której pustka, powietrze, światło i otoczenie stają się równorzędnymi elementami dzieła wraz z materiałem.",
      principle:
        "W Aeromorfizmie nie tworzy się pełnej rzeźby, w której następnie wykonuje się otwory. To struktura, linia i pustka od początku tworzą rzeźbę."
    },
    origins: {
      kicker: "Początek",
      title: "POCZĄTEK — MOAI",
      intro: "Moai nie jest tematem Aeromorfizmu. Moai jest jego początkiem.",
      body: [
        "Jednym z najważniejszych impulsów prowadzących do powstania Aeromorfizmu były monumentalne figury Moai z Rapa Nui.",
        "Nie ich dosłowny wygląd. Nie próba kopiowania. Nie rekonstrukcja.",
        "Inspiracją stało się coś znacznie głębszego: ich zdolność do istnienia w krajobrazie jako niemal absolutna forma obecności.",
        "Moai potrafi dominować przestrzeń bez ruchu, narracji i ornamentu. Pozostaje człowiek, monument, ziemia i niebo."
      ],
      quote: "Nie kopiujemy Moai. Uczymy się od nich monumentalności.",
      question:
        "Co stanie się z monumentem, jeśli zachowamy jego obecność, ale odbierzemy mu masę?"
    },
    principles: [
      {
        id: "monolith",
        title: "OD MONOLITU DO PUSTKI",
        body:
          "Klasyczny monument opiera swoją obecność na masie. Aeromorfizm odwraca tę relację: monolit zostaje otwarty, bryła staje się strukturą, masa staje się linią, a ciężar zostaje zastąpiony przestrzenią.",
        quote: "Monolit staje się szkieletem. Masa staje się linią. Kamień staje się powietrzem."
      },
      {
        id: "void",
        title: "PUSTKA JEST MATERIAŁEM",
        body:
          "W klasycznej rzeźbie pustka istnieje przede wszystkim poza dziełem. W Aeromorfizmie znajduje się także wewnątrz niego. Otwór nie oznacza braku. Jest świadomie zaprojektowaną częścią kompozycji.",
        quote: "Pustka nie jest tym, czego zabrakło. Pustka jest tym, co zostało zaprojektowane."
      },
      {
        id: "air",
        title: "POWIETRZE STAJE SIĘ CZĘŚCIĄ DZIEŁA",
        body:
          "Rzeźba Aeromorficzna nie zamyka przestrzeni. Pozwala jej przez siebie przechodzić. Powietrze wypełnia miejsca, które w tradycyjnym pomniku zajmowałby kamień lub metal.",
        quote: "Forma, której częścią jest powietrze."
      },
      {
        id: "light",
        title: "ŚWIATŁO RZEŹBI RZEŹBĘ",
        body:
          "Aeromorficzna forma pozwala światłu wejść do środka. Światło przechodzi przez konstrukcję, tworzy cienie i zmienia sylwetkę w zależności od pory dnia.",
        quote: "Jedna rzeźba. Nieskończona liczba obrazów."
      },
      {
        id: "observer",
        title: "RZEŹBA NIE MA JEDNEGO OBRAZU",
        body:
          "Aeromorficzna forma zmienia się razem z obserwatorem. Obraz powstaje pomiędzy dziełem a człowiekiem, który porusza się wokół niego.",
        quote: "Aeromorfizm nie pokazuje wszystkiego. Pozwala zobaczyć to, czego fizycznie nie ma."
      },
      {
        id: "landscape",
        title: "KRAJOBRAZ WCHODZI DO ŚRODKA",
        body:
          "W klasycznym pomniku krajobraz pozostaje tłem. W Aeromorfizmie może stać się częścią samego dzieła: widzianą przez twarz, pierś, szyję i otwartą konstrukcję.",
        quote: "Krajobraz wchodzi do środka."
      }
    ],
    archetype: {
      kicker: "Archetyp I",
      title: "FORMA PIERWOTNA",
      body:
        "Pierwszy archetyp Aeromorfizmu powraca do źródła inspiracji — monumentalnej postaci. Znajoma sylwetka zostaje pozbawiona monolitycznej masy. Pozostają tylko linie konieczne do tego, aby ludzki umysł nadal rozpoznawał figurę. Resztę tworzy przestrzeń.",
      caption: ["Archetyp I — Forma Pierwotna", "2026", "Daniel Nowicki", "Aeromorfizm", "Wizualizacja koncepcyjna"]
    },
    archetypesLead: "MOAI BYŁ POCZĄTKIEM. NIE GRANICĄ.",
    archetypesIntro:
      "Aeromorfizm nie jest zbiorem przypadkowych ażurowych figur. Jest językiem, który może rozwijać się od formy pierwotnej ku postaciom duchowym, cywilizacyjnym, symbolicznym i energetycznym.",
    archetypeGroups: [
      {
        id: "primary",
        title: "ARCHETYP I — FORMA PIERWOTNA",
        description:
          "Pierwotny archetyp Aeromorfizmu. Monumentalna postać sprowadzona do rytmu konstrukcji, pustki i obecności. Punkt wyjścia dla całego języka.",
        works: ["primary-form"]
      },
      {
        id: "spiritual",
        title: "ARCHETYP II — FORMA DUCHOWA",
        description:
          "Aeromorfizm jako język form kontemplacyjnych, duchowych i sakralnych. Nie poprzez kopiowanie ikonografii, lecz przez przemianę obecności w strukturę.",
        works: ["buddha-contemplative", "ganesha-symbolic"]
      },
      {
        id: "civilizational",
        title: "ARCHETYP III — FORMA CYWILIZACYJNA",
        description:
          "Formy związane z pamięcią cywilizacji, monumentalnym porządkiem i archetypiczną siłą dawnych kultur.",
        works: ["pharaoh-civilizational", "anubis-civilizational"]
      },
      {
        id: "energy",
        title: "ARCHETYP IV — FORMA ENERGII",
        description:
          "Aeromorfizm wykraczający poza postać ludzką. Energia, ruch, instynkt i symbol zamknięte w otwartej strukturze.",
        works: ["dragon-energetic"]
      }
    ],
    plannedWorks: [
      "Forma Duchowa — Shiva"
    ],
    works: [
      {
        id: "primary-form",
        title: "Archetyp I — Forma Pierwotna",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP I — FORMA PIERWOTNA",
        image: primaryWorkImage,
        alt: "Archetyp I — Forma Pierwotna, aeromorficzna wizualizacja koncepcyjna",
        featured: true
      },
      {
        id: "buddha-contemplative",
        title: "Forma Kontemplacyjna — Buddha",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP II — FORMA DUCHOWA",
        image: buddhaWorkImage,
        alt: "Forma Kontemplacyjna — Buddha, aeromorficzna wizualizacja koncepcyjna",
        featured: true
      },
      {
        id: "ganesha-symbolic",
        title: "Forma Symboliczna — Ganesha",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP II — FORMA DUCHOWA",
        image: ganeshaWorkImage,
        alt: "Forma Symboliczna — Ganesha, aeromorficzna wizualizacja koncepcyjna",
        featured: false
      },
      {
        id: "pharaoh-civilizational",
        title: "Forma Cywilizacyjna — Pharaoh",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP III — FORMA CYWILIZACYJNA",
        image: pharaohWorkImage,
        alt: "Forma Cywilizacyjna — Pharaoh, aeromorficzna wizualizacja koncepcyjna",
        featured: true
      },
      {
        id: "anubis-civilizational",
        title: "Forma Archetypiczna — Anubis",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP III — FORMA CYWILIZACYJNA",
        image: anubisWorkImage,
        alt: "Forma Archetypiczna — Anubis, aeromorficzna wizualizacja koncepcyjna",
        featured: true
      },
      {
        id: "dragon-energetic",
        title: "Forma Energii — Dragon",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorfizm",
        status: "Wizualizacja koncepcyjna",
        archetype: "ARCHETYP IV — FORMA ENERGII",
        image: dragonWorkImage,
        alt: "Forma Energii — Dragon, aeromorficzna wizualizacja koncepcyjna",
        featured: true
      }
    ],
    gallery: {
      title: "GALERIA / ARCHETYPY",
      note:
        "Galeria jest prowadzona kuratorsko. Pokazuje dostępne prace jako część rozwoju języka, a nie jako przypadkowy katalog obrazów.",
      cta: "Zobacz pełną galerię",
      worksIntro:
        "Pełna prezentacja dzieł dostępnych w aktualnym repozytorium. Każda praca jest podpisana jako wizualizacja koncepcyjna, jeśli nie jest fizyczną realizacją.",
      missingImages:
        "Pełna galeria obejmuje dostępne wizualizacje koncepcyjne. Shiva pozostaje opisana jako przyszła pozycja drugiego kręgu, ponieważ jej plik nie jest obecnie dostępny w projekcie."
    },
    authorBlock: {
      kicker: "Autor",
      title: "DANIEL NOWICKI",
      subtitle: "TWÓRCA AEROMORFIZMU",
      body: [
        "Daniel Nowicki jest twórcą Aeromorfizmu — autorskiego współczesnego nurtu rzeźbiarskiego opartego na relacji materii, pustki, światła, powietrza i przestrzeni.",
        "Punktem wyjścia do powstania Aeromorfizmu była fascynacja monumentalną obecnością rzeźby, siłą uproszczonej sylwetki oraz pytanie, czy monument może zachować swoją moc po odebraniu mu niemal całej masy.",
        "Jednym z pierwszych impulsów stały się Moai — nie jako obiekt kopiowania, lecz jako archetyp obecności.",
        "Daniel Nowicki jest autorem Manifestu Aeromorfizmu oraz twórcą jego podstawowych archetypów."
      ],
      sign: ["Daniel Nowicki", "Creator of Aeromorphism", "Author of the Aeromorphism Manifesto", "2026"]
    },
    manifesto: {
      title: "MANIFEST AEROMORFIZMU",
      subtitle: "DANIEL NOWICKI / TWÓRCA AEROMORFIZMU / 2026",
      intro: "Manifest jest dokumentem założycielskim nurtu: zwięzłą deklaracją tego, czym jest forma, pustka, światło i obecność w Aeromorfizmie.",
      items: [
        "FORMA NIE MUSI BYĆ PEŁNA, ABY ISTNIEĆ.",
        "PUSTKA JEST MATERIAŁEM.",
        "POWIETRZE JEST CZĘŚCIĄ RZEŹBY.",
        "ŚWIATŁO WSPÓŁTWORZY DZIEŁO.",
        "OTOCZENIE NIE JEST TŁEM — MOŻE STAĆ SIĘ CZĘŚCIĄ FORMY.",
        "KONSTRUKCJA NIE ZNAJDUJE SIĘ WEWNĄTRZ RZEŹBY. KONSTRUKCJA JEST RZEŹBĄ.",
        "MONUMENTALNOŚĆ NIE WYMAGA MASY.",
        "RZEŹBA ZMIENIA SIĘ WRAZ Z POZYCJĄ OBSERWATORA.",
        "TECHNOLOGIA JEST NARZĘDZIEM. IDEA NALEŻY DO CZŁOWIEKA.",
        "MATERIA WYZNACZA FORMĘ. PUSTKA DAJE JEJ ŻYCIE."
      ],
      sign: "DANIEL NOWICKI / TWÓRCA AEROMORFIZMU / 2026"
    },
    architecture: {
      kicker: "RZEŹBA → MONUMENT → PRZESTRZEŃ → ARCHITEKTURA",
      title: "OD RZEŹBY DO ARCHITEKTURY",
      subtitle: "MOAI OBSERVATION TOWER",
      dayImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-day.png",
      modularImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-modular-concept.png",
      eveningImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-evening.png",
      dayAlt: "Dzienna wizualizacja koncepcyjna Moai Observation Tower w przestrzeni nadmorskiej",
      modularAlt: "Plansza techniczna Moai Observation Tower — Modular Segmentation Proposal",
      eveningAlt: "Wieczorna wizualizacja koncepcyjna Moai Observation Tower w krajobrazie nadmorskim",
      body: [
        "Aeromorfizm od początku stawia pytanie o granicę pomiędzy rzeźbą, monumentem i architekturą.",
        "Jedną z pierwszych odpowiedzi na to pytanie stała się koncepcja wieży widokowej dla Rapa Nui Park.",
        "Punktem wyjścia była aeromorficzna rzeźba Moai — autorska koncepcja Daniela Nowickiego. Zachowując jej rozpoznawalną, monumentalną sylwetkę oraz charakterystyczną otwartą strukturę, Konrad Niewolski przekształcił ideę rzeźby w projekt przestrzeni, do której człowiek może wejść.",
        "Powstała koncepcja Moai Observation Tower — monumentalnej wieży widokowej, w której ażurowa forma przestaje pełnić wyłącznie funkcję rzeźbiarską. Staje się konstrukcją, komunikacją, punktem obserwacyjnym i przestrzenią doświadczenia.",
        "Człowiek nie stoi już przed monumentem. Wchodzi do jego wnętrza.",
        "Przemieszcza się pomiędzy elementami struktury. Patrzy przez jej otwarcia na krajobraz. Światło, niebo i otoczenie przenikają przez bryłę dokładnie tak, jak zakłada filozofia Aeromorfizmu.",
        "W ten sposób idea rozpoczęta od rzeźby Moai przekracza granicę obiektu artystycznego."
      ],
      quote: "Konstrukcja nie znajduje się wewnątrz rzeźby.\nKonstrukcja jest rzeźbą.",
      technicalText:
        "Aeromorficzna powłoka przestaje być dekoracją nałożoną na architekturę. Staje się językiem, który definiuje cały obiekt — jego sylwetkę, konstrukcję, światło i sposób doświadczania przestrzeni.",
      philosophy:
        "W tradycyjnej rzeźbie człowiek ogląda dzieło z zewnątrz. W Moai Observation Tower człowiek może wejść do środka formy.",
      ending: [
        "RZEŹBA STAJE SIĘ PRZESTRZENIĄ.",
        "MONUMENT STAJE SIĘ ARCHITEKTURĄ.",
        "AEROMORFIZM STAJE SIĘ MIEJSCEM."
      ],
      credits: [
        ["Koncepcja Aeromorfizmu i pierwotnej rzeźby Moai", "DANIEL NOWICKI"],
        ["Koncepcja i projekt Moai Observation Tower", "KONRAD NIEWOLSKI"],
        ["Projekt", "RAPA NUI PARK"],
        ["Status", "KONCEPCJA / WIZUALIZACJE PROJEKTOWE"]
      ],
      enlarge: "Powiększ planszę techniczną",
      close: "Zamknij powiększenie"
    },
    rapaNuiPark: {
      title: "FROM IDEA TO MONUMENT",
      body:
        "Jednym z miejsc, w których idea Aeromorfizmu może osiągnąć skalę monumentalną, jest projekt Rapa Nui Park. Rapa Nui Park i Aeromorfizm pozostają jednak odrębnymi projektami. Pierwszy jest przestrzenią monumentalnego doświadczenia. Drugi jest językiem artystycznym.",
      link: "RAPA NUI PARK — Explore the monumental project"
    },
    footer: {
      line: "A sculptural movement created by Daniel Nowicki.",
      creator: "Creator of Aeromorphism / Author of the Aeromorphism Manifesto",
      copyright: "© 2026 Daniel Nowicki"
    }
  },
  en: {
    lang: "en",
    brand: "AEROMORPHISM",
    brandLabel: "Aeromorphism",
    creator: "Daniel Nowicki",
    creatorLine: "Daniel Nowicki — Creator of Aeromorphism",
    creatorManifest: "Daniel Nowicki — Author of the Aeromorphism Manifesto",
    title: "Aeromorphism",
    seoTitle: "Aeromorphism — A New Sculptural Movement by Daniel Nowicki",
    seoDescription:
      "Aeromorphism is a sculptural concept created by Daniel Nowicki in which matter, void, air, light and space become equal elements of form.",
    locale: "en_US",
    nav: {
      manifest: "Manifest",
      origins: "Origins",
      archetypes: "Archetypes",
      works: "Works",
      author: "Author",
      language: "PL",
      menu: "Menu",
      close: "Close"
    },
    hero: {
      kicker: "Daniel Nowicki / 2026",
      title: "AEROMORPHISM",
      subtitle: "THE ART OF MATTER AND VOID",
      lines: ["Sculpting with matter.", "Sculpting with space.", "Sculpting with air."],
      imageAlt: "Archetype I — Primary Form, aeromorphic conceptual visualization by Daniel Nowicki",
      imageCaption: "Archetype I — Primary Form / 2026 / Daniel Nowicki / Aeromorphism / Conceptual visualization",
      primary: "Manifest",
      secondary: "View works"
    },
    definition: {
      heading: "Canonical Definition",
      quote:
        "Aeromorphism is a contemporary, authorial sculptural movement created by Daniel Nowicki, based on building a recognizable form through an open spatial structure in which void, air, light and surroundings become equal elements of the work together with material.",
      principle:
        "In Aeromorphism one does not create a complete sculpture and then cut holes into it. Structure, line and void create the sculpture from the beginning."
    },
    origins: {
      kicker: "Origins",
      title: "THE BEGINNING — MOAI",
      intro: "Moai is not the subject of Aeromorphism. Moai is its beginning.",
      body: [
        "One of the most important impulses leading to Aeromorphism was the monumental Moai figures of Rapa Nui.",
        "Not their literal appearance. Not an attempt to copy. Not a reconstruction.",
        "The inspiration was deeper: their ability to exist in the landscape as an almost absolute form of presence.",
        "Moai can dominate space without movement, narrative or ornament. What remains is human, monument, earth and sky."
      ],
      quote: "We do not copy Moai. We learn monumentality from them.",
      question: "What happens to a monument if we preserve its presence but remove its mass?"
    },
    principles: [
      {
        id: "monolith",
        title: "FROM MONOLITH TO VOID",
        body:
          "The classical monument bases its presence on mass. Aeromorphism reverses that relationship: the monolith opens, the solid becomes structure, mass becomes line, and weight is replaced by space.",
        quote: "The monolith becomes a skeleton. Mass becomes line. Stone becomes air."
      },
      {
        id: "void",
        title: "VOID IS MATERIAL",
        body:
          "In classical sculpture, void exists mainly outside the work. In Aeromorphism it also exists inside it. An opening is not absence. It is a designed part of the composition.",
        quote: "Void is not what is missing. Void is what has been designed."
      },
      {
        id: "air",
        title: "AIR BECOMES PART OF THE WORK",
        body:
          "An Aeromorphic sculpture does not close space. It lets space pass through it. Air fills the places that stone or metal would occupy in a traditional monument.",
        quote: "A form whose part is air."
      },
      {
        id: "light",
        title: "LIGHT SCULPTS THE SCULPTURE",
        body:
          "The Aeromorphic form lets light enter. Light passes through the structure, creates shadows and changes the silhouette throughout the day.",
        quote: "One sculpture. An infinite number of images."
      },
      {
        id: "observer",
        title: "THE SCULPTURE HAS NO SINGLE IMAGE",
        body:
          "The Aeromorphic form changes with the observer. The image emerges between the work and the person moving around it.",
        quote: "Aeromorphism does not show everything. It lets us see what is not physically there."
      },
      {
        id: "landscape",
        title: "THE LANDSCAPE ENTERS THE INSIDE",
        body:
          "In the classical monument the landscape remains background. In Aeromorphism it can become part of the work itself: seen through the face, chest, neck and open structure.",
        quote: "The landscape enters the inside."
      }
    ],
    archetype: {
      kicker: "Archetype I",
      title: "PRIMARY FORM",
      body:
        "The first archetype of Aeromorphism returns to the source of inspiration — the monumental figure. A familiar silhouette is deprived of monolithic mass. Only the lines necessary for the human mind to continue recognizing the figure remain. The rest is created by space.",
      caption: ["Archetype I — Primary Form", "2026", "Daniel Nowicki", "Aeromorphism", "Conceptual visualization"]
    },
    archetypesLead: "MOAI WAS THE BEGINNING. NOT THE LIMIT.",
    archetypesIntro:
      "Aeromorphism is not a random collection of openwork figures. It is a language that can develop from the primal form toward spiritual, civilizational, symbolic and energetic forms.",
    archetypeGroups: [
      {
        id: "primary",
        title: "ARCHETYPE I — PRIMARY FORM",
        description:
          "The primal archetype of Aeromorphism. A monumental figure reduced to structure, void, and presence. The origin point of the entire language.",
        works: ["primary-form"]
      },
      {
        id: "spiritual",
        title: "ARCHETYPE II — SPIRITUAL FORM",
        description:
          "Aeromorphism as a language of contemplative, spiritual, and sacred forms. Not through literal imitation, but through the transformation of presence into structure.",
        works: ["buddha-contemplative", "ganesha-symbolic"]
      },
      {
        id: "civilizational",
        title: "ARCHETYPE III — CIVILIZATIONAL FORM",
        description:
          "Forms connected with civilizational memory, monumental order, and the archetypal force of ancient cultures.",
        works: ["pharaoh-civilizational", "anubis-civilizational"]
      },
      {
        id: "energy",
        title: "ARCHETYPE IV — ENERGY FORM",
        description:
          "Aeromorphism moving beyond the human figure. Energy, motion, instinct, and symbol expressed through an open structure.",
        works: ["dragon-energetic"]
      }
    ],
    plannedWorks: [
      "Spiritual Form — Shiva"
    ],
    works: [
      {
        id: "primary-form",
        title: "Archetype I — Primary Form",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE I — PRIMARY FORM",
        image: primaryWorkImage,
        alt: "Archetype I — Primary Form, aeromorphic conceptual visualization",
        featured: true
      },
      {
        id: "buddha-contemplative",
        title: "Contemplative Form — Buddha",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE II — SPIRITUAL FORM",
        image: buddhaWorkImage,
        alt: "Contemplative Form — Buddha, aeromorphic conceptual visualization",
        featured: true
      },
      {
        id: "ganesha-symbolic",
        title: "Symbolic Form — Ganesha",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE II — SPIRITUAL FORM",
        image: ganeshaWorkImage,
        alt: "Symbolic Form — Ganesha, aeromorphic conceptual visualization",
        featured: false
      },
      {
        id: "pharaoh-civilizational",
        title: "Civilizational Form — Pharaoh",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE III — CIVILIZATIONAL FORM",
        image: pharaohWorkImage,
        alt: "Civilizational Form — Pharaoh, aeromorphic conceptual visualization",
        featured: true
      },
      {
        id: "anubis-civilizational",
        title: "Archetypal Form — Anubis",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE III — CIVILIZATIONAL FORM",
        image: anubisWorkImage,
        alt: "Archetypal Form — Anubis, aeromorphic conceptual visualization",
        featured: true
      },
      {
        id: "dragon-energetic",
        title: "Energetic Form — Dragon",
        year: "2026",
        author: "Daniel Nowicki",
        movement: "Aeromorphism",
        status: "Conceptual visualization",
        archetype: "ARCHETYPE IV — ENERGY FORM",
        image: dragonWorkImage,
        alt: "Energetic Form — Dragon, aeromorphic conceptual visualization",
        featured: true
      }
    ],
    gallery: {
      title: "GALLERY / ARCHETYPES",
      note:
        "The gallery is curated. It presents available works as part of the development of a language, not as a random image catalogue.",
      cta: "View full gallery",
      worksIntro:
        "A complete presentation of the works available in the current repository. Each work is labeled as a conceptual visualization when it is not a physical realization.",
      missingImages:
        "The full gallery includes the available conceptual visualizations. Shiva remains noted as a future second-circle position because its file is not currently available in the project."
    },
    authorBlock: {
      kicker: "Author",
      title: "DANIEL NOWICKI",
      subtitle: "CREATOR OF AEROMORPHISM",
      body: [
        "Daniel Nowicki is the creator of Aeromorphism — an authorial contemporary sculptural movement based on the relationship between matter, void, light, air and space.",
        "The point of departure for Aeromorphism was a fascination with the monumental presence of sculpture, the power of a simplified silhouette, and the question of whether a monument can retain its force after almost all of its mass has been removed.",
        "One of the first impulses was Moai — not as an object to copy, but as an archetype of presence.",
        "Daniel Nowicki is the author of the Aeromorphism Manifesto and the creator of its fundamental archetypes."
      ],
      sign: ["Daniel Nowicki", "Creator of Aeromorphism", "Author of the Aeromorphism Manifesto", "2026"]
    },
    manifesto: {
      title: "MANIFESTO OF AEROMORPHISM",
      subtitle: "DANIEL NOWICKI / CREATOR OF AEROMORPHISM / 2026",
      intro:
        "The manifesto is the founding document of the movement: a concise declaration of form, void, light and presence in Aeromorphism.",
      items: [
        "FORM DOES NOT HAVE TO BE FULL IN ORDER TO EXIST.",
        "VOID IS MATERIAL.",
        "AIR IS PART OF THE SCULPTURE.",
        "LIGHT CO-CREATES THE WORK.",
        "THE SURROUNDING IS NOT BACKGROUND — IT CAN BECOME PART OF FORM.",
        "STRUCTURE IS NOT INSIDE THE SCULPTURE. STRUCTURE IS THE SCULPTURE.",
        "MONUMENTALITY DOES NOT REQUIRE MASS.",
        "THE SCULPTURE CHANGES WITH THE OBSERVER'S POSITION.",
        "TECHNOLOGY IS A TOOL. THE IDEA BELONGS TO THE HUMAN.",
        "MATTER DEFINES FORM. VOID GIVES IT LIFE."
      ],
      sign: "DANIEL NOWICKI / CREATOR OF AEROMORPHISM / 2026"
    },
    architecture: {
      kicker: "SCULPTURE → MONUMENT → SPACE → ARCHITECTURE",
      title: "FROM SCULPTURE TO ARCHITECTURE",
      subtitle: "MOAI OBSERVATION TOWER",
      dayImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-day.png",
      modularImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-modular-concept.png",
      eveningImage: "/images/aeromorphism/moai-observation-tower/moai-observation-tower-evening.png",
      dayAlt: "Daytime conceptual visualization of Moai Observation Tower in a seaside landscape",
      modularAlt: "Technical board for Moai Observation Tower — Modular Segmentation Proposal",
      eveningAlt: "Evening conceptual visualization of Moai Observation Tower in a seaside landscape",
      body: [
        "From the beginning, Aeromorphism has asked where sculpture ends and where monument and architecture begin.",
        "One of the first answers to that question is the concept of an observation tower for Rapa Nui Park.",
        "The point of departure was the aeromorphic Moai sculpture — an original concept by Daniel Nowicki. Preserving its recognizable monumental silhouette and its characteristic open structure, Konrad Niewolski transformed the sculptural idea into a spatial project that people can enter.",
        "The result is the concept of Moai Observation Tower: a monumental observation tower in which the openwork form is no longer only sculptural. It becomes structure, circulation, viewing point and a space of experience.",
        "The human being no longer stands in front of the monument. The human being enters its interior.",
        "Visitors move between structural elements. They look through its openings toward the landscape. Light, sky and surroundings pass through the volume exactly as the philosophy of Aeromorphism proposes.",
        "In this way, the idea that began with the Moai sculpture crosses the boundary of the art object."
      ],
      quote: "The structure is not inside the sculpture.\nThe structure is the sculpture.",
      technicalText:
        "The aeromorphic shell is no longer decoration applied to architecture. It becomes the language that defines the entire object — its silhouette, structure, light and the way space is experienced.",
      philosophy:
        "In traditional sculpture, the viewer observes the work from outside. In Moai Observation Tower, a person can enter the inside of the form.",
      ending: [
        "SCULPTURE BECOMES SPACE.",
        "MONUMENT BECOMES ARCHITECTURE.",
        "AEROMORPHISM BECOMES PLACE."
      ],
      credits: [
        ["Aeromorphism and original Moai sculpture concept", "DANIEL NOWICKI"],
        ["Moai Observation Tower concept and design", "KONRAD NIEWOLSKI"],
        ["Project", "RAPA NUI PARK"],
        ["Status", "CONCEPT / DESIGN VISUALIZATION"]
      ],
      enlarge: "Enlarge technical board",
      close: "Close enlargement"
    },
    rapaNuiPark: {
      title: "FROM IDEA TO MONUMENT",
      body:
        "One of the places where the idea of Aeromorphism may reach monumental scale is the Rapa Nui Park project. Rapa Nui Park and Aeromorphism remain separate projects. The first is a space of monumental experience. The second is an artistic language.",
      link: "RAPA NUI PARK — Explore the monumental project"
    },
    footer: {
      line: "A sculptural movement created by Daniel Nowicki.",
      creator: "Creator of Aeromorphism / Author of the Aeromorphism Manifesto",
      copyright: "© 2026 Daniel Nowicki"
    }
  }
} as const;

export function localizedPath(language: SiteLanguage, route: SiteRoute = "home") {
  const prefix = language === "en" ? "/en" : "";
  if (route === "home") {
    return prefix || "/";
  }

  const path = routes.find((item) => item.key === route)?.path ?? "";
  return `${prefix}/${path}`;
}

export function routeFromSlug(slug?: string[]): SiteRoute | null {
  if (!slug || slug.length === 0) {
    return "home";
  }

  if (slug.length > 1) {
    return null;
  }

  const route = routes.find((item) => item.path === slug[0]);
  return route?.key ?? null;
}
