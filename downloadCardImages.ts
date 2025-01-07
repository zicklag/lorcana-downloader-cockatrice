import cards from "./cards.json" with { type: "json" }

console.group("Info")

console.log("Card count:", cards.length)

console.groupEnd();

console.group("Downloading...")

const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });
let i = 1;
for (const card of cards) {
    console.log('Progress:', formatter.format(i / cards.length));
    console.log('Downloading:', card.Name);

    try {
        const file = await Deno.open(`./images/${card.Name}.png`, {createNew: true, write: true });
        const resp = await fetch(card.Image);
        resp.body?.pipeTo(file.writable)
        await new Promise(resolve => setTimeout(resolve, 250));
    } catch (e) {
        console.log(`Error loading ${card.Name}, skipping: ${e}`)
    }
    i++;
}

console.log("Starting card Download...")

