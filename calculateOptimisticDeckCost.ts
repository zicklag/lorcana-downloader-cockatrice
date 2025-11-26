import { DbData } from "./types.ts";
import { parse } from "https://deno.land/x/xml@6.0.4/parse.ts";

type DeckXml = {
  cockatrice_deck:{
    deckname:string;
    zone:
      {
        '@name':string,
        card: {
          '@number':string;
          '@name':string;
        }[]
      }[];
  }
};

const db: DbData = JSON.parse(await Deno.readTextFile("./database.json"));
const cards = Object.values(db.cards).flat();
const path = Deno.args[0];
const sideboard_included = Deno.args[1] == "--sideboard";
const deck = parse(await Deno.readTextFile(path)) as unknown as DeckXml;
const zones = deck.cockatrice_deck.zone.filter(x => x['@name'] == "main" || (sideboard_included && x["@name"] == "side"));

if (!zones) Deno.exit(1);

let total_cost = 0.00;

for (const zone of zones) {
  for (const card of zone.card) {
    const [primary, version] = card["@name"].split(' - ');

    const data = cards.find(x=>x.name == primary && x.version == version);
    if (!(data)) {
      console.log("Failed to Find: " + card["@name"]);
      continue;
    }
    total_cost += parseFloat(data.prices.usd || '0') * parseFloat(card["@number"]);
  }
}
console.log("Total Estimated Cost: " + total_cost.toPrecision(4));