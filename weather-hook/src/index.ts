import "dotenv/config";
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