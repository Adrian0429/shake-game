export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Received request:', req.body);  // Logs the request

        const { message } = req.body;

        // Check if the message contains the `/start` command
        if (message && message.text === '/start') {
            console.log('Received /start command:', message);
            const chatId = message.chat.id;
            const text = 'Hello! Welcome to our bot! How can I assist you today?';

            await sendMessage(chatId, text);
        } else {
            console.log('Message not recognized:', message);
        }

        res.status(200).send('OK');
    } else {
        res.status(405).send({ message: 'Only POST requests allowed' });
    }
}

// Function to send a message to Telegram
async function sendMessage(chatId, text) {
    const url = `https://api.telegram.org/bot7064814930:AAEjykd4sHl5F6iPfS6bXKXKYe4Uk521Wa8/sendMessage`;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: String(chatId),
            text: text,
        }),
    });
}
