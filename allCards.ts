type AllCards = {
  metadata: Metadata;
  sets: { [setId: string]: CardSet };
  cards: Card[];
};

type Metadata = {
  formatVersion: string;
  generatedOn: string;
  language: string;
};

type CardSet = {
  prereleaseDate: string;
  releaseDate: string;
  hasAllCards: boolean;
  type: string;
  number: number;
  allowedInFormats: AllowedInFormats;
  allowedInTournamentsFromDate: string;
  name: string;
};

type Card = {
  name: string;
  setCode: string;
  fullName: string;
  abilities: unknown[];
  allowedInFormats: AllowedInFormats;
  images: {
    full: string;
    thumbnail: string;
    foilMask?: string;
    fullFoil?: string;
    varnishMask?: string;
  };
};

type AllowedInFormats = unknown;

const data = await Deno.readTextFile(import.meta.dirname + "/allCards.json");

export const allCards: AllCards = JSON.parse(data);
