// pages/api/telegram.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Check if the message contains the /start command
        if (message && message.text === '/start') {
            const chatId = message.chat.id;

            // Respond back to the user with a message or a link
            const startAppUrl = 'https://your-nextjs-app-url.com'; // Replace with your app's URL

            // Send a message with the link to start the app
            await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Click here to start the app: [Open App](${startAppUrl})`,
                    parse_mode: 'Markdown',
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
