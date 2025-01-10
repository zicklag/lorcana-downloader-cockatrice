export type Card = {
  id: string;
  name: string;
  version: string;
  layout: string;
  released_at: string;
  image_uris: {
    digital: {
      small: string;
      normal: string;
      large: string;
    };
  };
  cost: number;
  inkwell: boolean;
  ink: string | null;
  type: string[];
  classifications: string[] | null;
  text: string;
  move_cost: number | null;
  strength: number | null;
  willpower: number | null;
  lore: number | null;
  rarity: string;
  illustrators: string[];
  collector_number: string;
  lang: string;
  flavor_text: string | null;
  tcgplayer_id: number;
  legalities: {
    core: "legal" | "not_legal" | "banned";
  };
  set: {
    id: string;
    code: string;
    name: string;
  };
  prices: {
    usd: string | null;
    usd_foil: string | null;
  };
};

export type Set = {
  id: string;
  name: string;
  code: string;
  released_at: string;
  prereleased_at: string;
};

export type DbData = {
  sets: Set[];
  cards: { [set_code: string]: Card[] };
};

export function cardName({
  name,
  rarity,
  version,
}: {
  name: string;
  rarity: string;
  version?: string;
}): string {
  const normalRarities = [
    "common",
    "uncommon",
    "rare",
    "super_rare",
    "legendary",
  ];
  const rarityQualifier = normalRarities.includes(rarity.toLowerCase()) ? "" : ` - ${rarity}`;
  const versionQualifier = version ? ` - ${version}` : "";
  return `${name}${versionQualifier}${rarityQualifier}`;
}
