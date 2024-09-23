// /utils/api.ts or /services/api.ts
import axios from "axios";

export const sendMessage = async (chatId: string, message: string) => {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_SECRET}/sendMessage`,  {
      chat_id: chatId,
      text: message,
    });
    console.log("Success sending message", response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


