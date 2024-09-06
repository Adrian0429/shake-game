export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Check if the message contains the /start command
        if (message && message.text === '/start') {
            const chatId = message.chat.id;

            // URL of your mini app, which will be sent as a link to open inside Telegram
            const startAppUrl = 'https://shakeshake.vercel.app';

            // Send a response message to the user with a link to open the mini app
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_SECRET}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Click here to start the app: [Open ShakeShake](https://t.me/shakeTongamebot?start=webapp)`,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Open ShakeShake Web App",
                                    web_app: { url: startAppUrl }, // Opens the web app in Telegram
                                },
                            ],
                        ],
                    },
                }),
            });

            res.status(200).json({ message: 'Command processed' });
        } else {
            res.status(200).json({ message: 'Not a /start command' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
