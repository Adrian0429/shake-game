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
  energy: number;
  region: string;
  coin: number;
  daily_status: boolean;
  daily_count: number;
  exchange: string;
}
