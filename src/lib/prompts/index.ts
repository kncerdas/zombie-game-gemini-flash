import { NOILY_PROMPTS } from "./noily";
import { KENNETH_PROMPTS } from "./kenneth";
import { KATHERINE_PROMPTS } from "./katherine";
import { JOSHUA_PROMPTS } from "./joshua";
import { STEPHEN_PROMPTS } from "./stephen";
import { ERICKA_PROMPTS } from "./ericka";
import { JASON_PROMPTS } from "./jason";
import { LAURA_PROMPTS } from "./laura";

const CHARACTER_PROMPTS = {
  noily: NOILY_PROMPTS,
  kenneth: KENNETH_PROMPTS,
  katherine: KATHERINE_PROMPTS,
  joshua: JOSHUA_PROMPTS,
  stephen: STEPHEN_PROMPTS,
  ericka: ERICKA_PROMPTS,
  jason: JASON_PROMPTS,
  laura: LAURA_PROMPTS,
} as const;

export const getCharacterPrompts = (characterId: string) => {
  return (
    CHARACTER_PROMPTS[characterId as keyof typeof CHARACTER_PROMPTS] ||
    CHARACTER_PROMPTS.noily
  );
};

export { CHARACTER_PROMPTS };
