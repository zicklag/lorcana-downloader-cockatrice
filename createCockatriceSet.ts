import {
  stringify as xmlStringify,
  type stringifyable,
} from "https://deno.land/x/xml@6.0.4/stringify.ts";
import { cardName, DbData } from "./types.ts";

const db: DbData = JSON.parse(await Deno.readTextFile("./database.json"));
const allCards = Object.values(db.cards).flat();

const xmlJson: stringifyable = {
  "@version": "1.0",
  cockatrice_carddatabase: {
    "@version": "4",
    sets: {
      set: db.sets.map((x) => ({
        name: x.code,
        longname: x.name,
        settype: "Custom",
        releaseDate: x.released_at,
      })),
    },
    cards: {
      card: allCards.map((x) => ({
        name: cardName(x),
        set: {
          "@rarity": x.rarity,
          "@uuid": x.id,
          "@picurl": x.image_uris.digital.large,
          "#text": x.set.code,
        },
        cipt: x.type[0] == "Location" ? "1" : null,
        prop: {
          lore: x.lore,
          maintype: x.type.join(","),
          toughness: x.willpower,
          loyalty: x.type[0],
          type: [...x.type, ...(x.classifications || [])]?.join(", ") || null,
          power: x.strength,
          colors: x.ink,
          pt: x.strength && x.willpower ? `${x.strength}/${x.willpower}` : null,
          cmc: x.cost,
          manacost: x.cost,
          "format-core": x.legalities.core,
        },
        text: x.text,
      })),
    },
  },
};

await Deno.writeFile(
  "./cockatrice.xml",
  new TextEncoder().encode(xmlStringify(xmlJson))
);
