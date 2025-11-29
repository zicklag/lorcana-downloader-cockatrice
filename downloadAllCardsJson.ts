const resp = await fetch('https://lorcanajson.org/files/current/en/allCards.json');
const content = await resp.text();
await Deno.writeTextFile('./allCards.json', content);