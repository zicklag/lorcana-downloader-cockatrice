import { cardName, DbData } from "./types.ts";
import ProgressBar from "jsr:@deno-library/progress";

const db: DbData = JSON.parse(await Deno.readTextFile("./database.json"));

const allCards = Object.values(db.cards).flat();
const progress = new ProgressBar({ title: "Download", total: allCards.length });

progress.render(0);
let completed = 0;
const completeCard = () => {
  completed += 1;
  progress.render(completed);
};

await Deno.mkdir("./images", { recursive: true });

await Promise.all(
  allCards.map(async (card) => {
    const name = cardName(card).replace(/[\?]/, '');
    const path = `./images/${name}.avif`;
    try {
      const file = await Deno.open(path, { write: true, createNew: true });

      const imageUrl = card.image_uris.digital.large;
      const resp = await fetch(imageUrl);
      await resp.body?.pipeTo(file.writable);
    } catch (_) {
      // Skip file that already exist.
    } finally {
      completeCard();
    }
  })
);

