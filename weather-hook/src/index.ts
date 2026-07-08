import "dotenv/config";
import superagent from 'superagent'
console.log(process.cwd());

const webhook_url = process.env.DISCORD_WEB_HOOK

if (!webhook_url) {
    throw new Error("DISCORD_WEB_HOOK is not set.")
}

class Crowller {
    private url = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json'
    async getRawHtml(){
        const result = await superagent.get(this.url);
        const data = JSON.parse(result.text);
        return data.text;
    }
}

const crowller = new Crowller()

const text  = await crowller.getRawHtml();

console.log(text);

await fetch(webhook_url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        content: text,
    }),
});