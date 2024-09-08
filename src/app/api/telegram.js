// pages/api/telegram.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Check if the incoming message is the /start command
        if (message && message.text === '/start') {
            const chatId = message.chat.id;

            // URL of your web app, which will be embedded in the Telegram button
            const startAppUrl = 'https://shakeshake.vercel.app'; // Your Next.js web app URL
            
            await fetch(`https://api.telegram.org/7064814930:AAEjykd4sHl5F6iPfS6bXKXKYe4Uk521Wa8/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Welcome to ShakeShake! Click the button below to start the app.`,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Open ShakeShake Web App',
                                    web_app: { url: startAppUrl }, // Opens the web app in Telegram
                                },
                            ],
                        ],
                    },
                }),
            });

            return res.status(200).json({ message: 'Command processed' });
        } else {
            // Handle other messages or commands if needed
            return res.status(200).json({ message: 'Not a /start command' });
        }
    } else {
        // Return an error for unsupported request methods
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
