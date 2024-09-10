// types.ts
export interface UserData {
  id: number;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export interface MeUser {
  tele_id: string;
  name: string;
  email: string;
  region: string;
  energy: number;
  coins: number;
  referral_code: string;
}
