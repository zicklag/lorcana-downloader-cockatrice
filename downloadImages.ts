import { allCards } from "./allCards.ts";
import ProgressBar from "jsr:@deno-library/progress";

const progress = new ProgressBar({
  title: "Download",
  total: allCards.cards.length,
});

progress.render(0);
let completed = 0;
const completeCard = () => {
  completed += 1;
  progress.render(completed);
};

await Deno.mkdir("./images", { recursive: true });

await Promise.all(
  allCards.cards.map(async (card) => {
    const name = card.fullName;
    const dir = `./images/${card.setCode}`;
    const path = `${dir}/${name}.jpg`;
    await Deno.mkdir(dir, { recursive: true });

    try {
      const stat = await Deno.stat(path);
      // Remove the file if it was a failed download from earlier
      if (stat.isFile && stat.size == 0) await Deno.remove(path);
    } catch (_) {
      // If the file doesn't exist we're good
    }

    try {
      const file = await Deno.open(path, { write: true, createNew: true });

      const imageUrl = card.images.full;
      const resp = await fetch(imageUrl);
      await resp.body?.pipeTo(file.writable);
    } catch (_) {
      // Skip file that already exist.
    } finally {
      completeCard();
    }
  })
);
