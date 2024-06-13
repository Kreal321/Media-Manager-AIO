import {AccountStatus} from "../enums/account-status.enum";

export interface Pikpak {
  id?: number;
  userId: string;
  username: string;
  password: string;
  deviceId: string;
  accessToken: string;
  refreshToken: string;

  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PikpakHistory {
  id?: number;
  pikpakId: number;
  title: string;
  message: string;
  success: boolean;
  createdAt: Date;
}
