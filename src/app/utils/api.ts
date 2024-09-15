// /utils/api.ts or /services/api.ts
import axios from "axios";

export const PostReferral = async (data: string, token: string) => {
  try {
    const response = await axios.post(`https://api2.fingo.co.id/api/user/referralClaim?referrer_=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    alert(response.data.message);
    console.log(response.data)
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
