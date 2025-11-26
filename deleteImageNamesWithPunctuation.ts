const listing = await Deno.readDir("./images");

const punctRegex = /[\?\"\'\!]/g;
for await (const entry of listing) {
  if (!entry.isFile) continue;
  if (!entry.name.match(punctRegex)) continue;

  await Deno.remove('./images/' + entry.name);
  console.log(`Deleted ${entry.name}`);
}
