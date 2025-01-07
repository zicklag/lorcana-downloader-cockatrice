import cards from "./cards.json" with { type: "json" }
import { stringify as xmlStringify, type stringifyable } from "https://deno.land/x/xml@6.0.4/stringify.ts"

const xmlJson: stringifyable = {
    "@version": "1.0",
    cockatrice_carddatabase: {
        "@version": "4",
        sets: {
            set: [
                {
                    name: "Lorcana",
                    longname: "Lorcana",
                    settype: "Custom",
                    releasedate: "2019-04-20"
                }
            ]
        },
        cards: {
            card: cards.map(x => ({
                name: x.Name,
                set: {
                    "@rarity": x.Rarity,
                    "@uuid": x.Set_ID,
                    "@picurl": x.Image,
                },
                prop: {
                    lore: x.Lore,
                    maintype: x.Type,
                    type: x.Type,
                    colors: x.Color,
                    pt: x.Strength && x.Willpower ? `${x.Strength}/${x.Willpower}` : undefined,
                    cmc: x.Cost,
                    manacost: x.Cost,
                },
                text: x.Body_Text    
            }))
        }
    },
}

await Deno.writeFile("./cockatrice.xml", new TextEncoder().encode(xmlStringify(xmlJson)))