export const UI_MESSAGES = {
  LOADING: {
    STORY: "Generando historia...",
    IMAGE: "Generando imagen...",
  },
  ERROR: {
    STORY_GENERATION: "Error al generar historia",
    IMAGE_GENERATION: "Error al generar imagen",
    MISSING_PROMPT: "Falta el prompt para generar la historia",
  },
  PLACEHOLDERS: {
    INPUT:
      "Describe qué quieres hacer, adónde ir, qué examinar o cómo reaccionar...",
  },
};

export const GAME_CONFIG = {
  IMAGE: {
    SEPARATOR: "IMAGEN: ",
  },
};

export const CHARACTER_CONFIGS = {
  noily: {
    IMAGE: {
      DEFAULT_PROMPT: "Blossom Coffee Shop with a famous Friends character",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/noily-cafe-owner.jpg", // Female café owner
      ENVIRONMENT_REFERENCE: "/images/references/environments/blossom-cafe.jpg", // Blossom café reference
      CHARACTER_REFERENCES: [
        "/images/references/characters/chandler-bing.jpg", // Chandler Bing
        "/images/references/characters/ross-geller.jpg", // Ross Geller
        "/images/references/characters/monica-geller.jpg", // Monica Geller
      ],
    },
  },
  kenneth: {
    IMAGE: {
      DEFAULT_PROMPT: "Park setting with Kenneth and Snoop Dogg sharing cannabis",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/kenneth-casual-guy.jpg", // Casual person
      ENVIRONMENT_REFERENCE: "/images/references/environments/park-setting.jpg", // Park with trees and benches
      CHARACTER_REFERENCES: [
        "/images/references/characters/snoop-dogg.jpg", // Snoop Dogg
      ],
    },
  },
  katherine: {
    IMAGE: {
      DEFAULT_PROMPT: "Office setting with magical Harry Potter elements",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/katherine-professional.jpg", // Professional woman
      ENVIRONMENT_REFERENCE: "/images/references/environments/office-with-owl.jpg", // Office with magical elements
      CHARACTER_REFERENCES: [
        "/images/references/characters/hermione-granger.jpg", // Hermione Granger
        "/images/references/characters/harry-potter.jpg", // Harry Potter
        "/images/references/characters/dumbledore.jpg", // Dumbledore
      ],
    },
  },
  joshua: {
    IMAGE: {
      DEFAULT_PROMPT: "Highway scene with alien spacecraft and cosmic sports",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/joshua-regular-guy.jpg", // Regular person
      ENVIRONMENT_REFERENCE: "/images/references/environments/highway-night.jpg", // Highway at night
      CHARACTER_REFERENCES: [
        "/images/references/characters/alien-beings.jpg", // Various alien beings
      ],
    },
  },
  stephen: {
    IMAGE: {
      DEFAULT_PROMPT: "Modern urban setting for gender fluid self-discovery journey",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/stephen-person.jpg", // Person exploring identity
      ENVIRONMENT_REFERENCE: "/images/references/environments/modern-city-street.jpg", // Modern city street
      CHARACTER_REFERENCES: [
        "/images/references/characters/attractive-man.jpg", // Attractive man for story
      ],
    },
  },
  ericka: {
    IMAGE: {
      DEFAULT_PROMPT: "Courthouse office with legal documents and Taylor Swift",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/ericka-court-worker.jpg", // Professional court worker
      ENVIRONMENT_REFERENCE: "/images/references/environments/courthouse-office.jpg", // Courthouse office
      CHARACTER_REFERENCES: [
        "/images/references/characters/taylor-swift.jpg", // Taylor Swift
      ],
    },
  },
  jason: {
    IMAGE: {
      DEFAULT_PROMPT: "Gym environment with fitness equipment and motivational figures",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/jason-athlete.jpg", // Muscular athlete
      ENVIRONMENT_REFERENCE: "/images/references/environments/modern-gym.jpg", // Modern gym
      CHARACTER_REFERENCES: [
        "/images/references/characters/mike-tyson.jpg", // Mike Tyson
        "/images/references/characters/andrew-tate.jpg", // Andrew Tate
      ],
    },
  },
  laura: {
    IMAGE: {
      DEFAULT_PROMPT: "Space adventure with Guardians of Galaxy ship and characters",
      MAIN_CHARACTER_REFERENCE: "/images/references/characters/laura-regular-person.jpg", // Regular person
      ENVIRONMENT_REFERENCE: "/images/references/environments/space-road-milano.jpg", // Milano ship on road
      CHARACTER_REFERENCES: [
        "/images/references/characters/star-lord.jpg", // Star-Lord
        "/images/references/characters/rocket-groot.jpg", // Rocket and Groot
      ],
    },
  },
};

export const getCharacterConfig = (characterId: string) => {
  return CHARACTER_CONFIGS[characterId as keyof typeof CHARACTER_CONFIGS] || CHARACTER_CONFIGS.noily;
};
