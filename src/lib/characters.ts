import type { Character } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "noily",
    name: "Noily",
    description: "Café owner in Costa Rica",
    profileImage: "/images/characters/noily.svg",
  },
  {
    id: "kenneth",
    name: "Kenneth",
    description: "Space explorer",
    profileImage: "/images/characters/kenneth.svg",
  },
  {
    id: "katherine",
    name: "Katherine", 
    description: "Medieval knight",
    profileImage: "/images/characters/katherine.svg",
  },
  {
    id: "joshua",
    name: "Joshua",
    description: "Post-apocalyptic survivor",
    profileImage: "/images/characters/joshua.svg",
  },
  {
    id: "stephen",
    name: "Stephen",
    description: "Victorian detective",
    profileImage: "/images/characters/stephen.svg",
  },
  {
    id: "ericka",
    name: "Ericka",
    description: "Underwater explorer",
    profileImage: "/images/characters/ericka.svg",
  },
  {
    id: "jason",
    name: "Jason",
    description: "Wild west gunslinger",
    profileImage: "/images/characters/jason.svg",
  },
  // {
  //   id: "laura",
  //   name: "Laura",
  //   description: "Cyberpunk hacker",
  //   profileImage: "/images/characters/laura.svg",
  // },
];

export const getCharacterById = (id: string): Character | undefined => {
  return CHARACTERS.find((character) => character.id === id);
};
