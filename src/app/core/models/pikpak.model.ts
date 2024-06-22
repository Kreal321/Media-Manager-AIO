import {AccountStatus} from "../enums/account-status.enum";

export class Pikpak {
  id?: number;
  userId: string;
  username: string;
  password: string;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
  captchaToken: string;

  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(username: string, password: string) {
    this.userId = "";
    this.username = username;
    this.password = password;
    this.deviceId = crypto.randomUUID();
    this.accessToken = "";
    this.refreshToken = "";
    this.captchaToken = "";
    this.status = AccountStatus.INITIALED;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}

export class PikpakHistory {
  id?: number;
  pikpakId: number;
  title: string;
  message: string;
  success: boolean;
  createdAt: Date;

  constructor(pikpakId: number, title: string, message: string, success: boolean = true) {
    this.pikpakId = pikpakId;
    this.title = title;
    this.message = message;
    this.success = success;
    this.createdAt = new Date();
  }
}
