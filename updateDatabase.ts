import { delay } from "@std/async";
import { Card, DbData, Set } from "./types.ts";

/** Add a polite delay to honor the API server's whishes */
async function pause() {
  await delay(1000);
}

type ApiSets = {
  results: Set[];
};

if (import.meta.main) {
  const sets = (
    (await (await fetch("https://api.lorcast.com/v0/sets")).json()) as ApiSets
  ).results;

  await pause();

  const cards: { [set_code: string]: Card[] } = {};

  for (const set of sets) {
    const c: Card[] = await (
      await fetch(`https://api.lorcast.com/v0/sets/${set.code}/cards`)
    ).json();

    cards[set.code] = c;

    await pause();
  }

  const dbData: DbData = {
    cards,
    sets,
  };

  await Deno.writeTextFile("database.json", JSON.stringify(dbData, null, "  "));
}
