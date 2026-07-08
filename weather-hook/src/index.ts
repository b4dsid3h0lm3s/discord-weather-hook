import "dotenv/config";
import superagent from 'superagent'
import  fs  from "node:fs/promises";

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

// ---------- 前回のメッセージを削除 ----------
try {
    const saved = JSON.parse(
        await fs.readFile("message.json", "utf8")
    );

    await fetch(
        `${webhook_url}/messages/${saved.messageId}`,
        {
            method: "DELETE",
        }
    );
} catch {
    // 初回実行なら何もしない
}

// ---------- 新しい通知 ----------
const res = await fetch(`${webhook_url}?wait=true`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        content: text,
    }),
});

const message = await res.json();

// ---------- メッセージIDを保存 ----------
await fs.writeFile(
    "message.json",
    JSON.stringify(
        {
            messageId: message.id,
        },
        null,
        2
    )
);

console.log("送信完了");
