import crypto from 'crypto';

const secret = "7064814930:AAEjykd4sHl5F6iPfS6bXKXKYe4Uk521Wa8";

export default function handler(req, res) {
    const { hash, ...data } = req.query;
    const checkString = Object.keys(data)
        .sort()
        .map(k => `${k}=${data[k]}`)
        .join('\n');
    const hmac = crypto.createHmac('sha256', secret);
    const checkHash = hmac.update(checkString).digest('hex');

    if (checkHash !== hash) {
        return res.status(403).send('Unauthorized');
    }

    // Authenticate the user with the provided data
    // For example, create a session or JWT token

    res.status(200).send('Authentication successful');
}
