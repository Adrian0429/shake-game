// pages/api/telegram-webhook.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        if (message && message.text) {
            const chatId = message.chat.id;
            const text = message.text.toLowerCase();

            if (text.startsWith("/start")) {
                // Extract parameter from /start command (optional)
                const param = text.split(" ")[1];

                // Send a link to the app or perform any logic here
                await sendMessage(chatId, `Welcome! Click the link to start the app: https://shakeshake.vercel.app`);

            } else {
                await sendMessage(chatId, "I didn't understand that. Try /start.");
            }
        }

        res.status(200).send("ok");
    } else {
        res.status(405).send({ message: "Only POST requests are allowed" });
    }
}

// Helper function to send messages back to the user
async function sendMessage(chatId, text) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_SECRET;

    const url = `https://api.telegram.org/bot7064814930:AAEjykd4sHl5F6iPfS6bXKXKYe4Uk521Wa8/sendMessage`;
    const body = {
        chat_id: chatId,
        text: text,
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}
