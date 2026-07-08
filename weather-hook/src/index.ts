import "dotenv/config";
import superagent from 'superagent'
console.log(process.cwd());

const webhook_url = process.env.DISCORD_WEB_HOOK

if (!webhook_url) {
    throw new Error("DISCORD_WEB_HOOK is not set.")
}

await fetch(webhook_url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        content: "Hello, Discord!"
    }),
});


class Crowller {
    private url = "http://https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json"
    constructor(){
         this.getRawHtml();
    }
    async getRawHtml(){
        const result = await superagent.get(this.url);
        console.log(result.text)
    }
}

const crowller = new Crowller()
