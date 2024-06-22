import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import Swal from "sweetalert2";
import {SettingService} from "./setting.service";
import {HttpClient} from "@angular/common/http";
import {Pikpak} from "../models/pikpak.model";
import {IndexeddbService} from "./indexeddb.service";
import {PikpakCaptchaTokenResponse, PikpakErrorResponse} from "../models/pikpakResponse.model";
import {PikpakRequest} from "../models/pikpakRequest.model";

@Injectable({
  providedIn: 'root'
})
export class PikpakRequestService {

  private retry: number = 0;
  private times: number = 0;


  constructor(
    private settingService: SettingService,
    private http: HttpClient,
    private indexeddbService: IndexeddbService
  ) { }

  async pikpakLogin(pikpak: Pikpak): Promise<Pikpak> {
    const captchaToken: string = await this._captchaTokenRenew(pikpak);
    const pikpakConfig = this.settingService.getPikpakConfig();
    const response: any = await this.request(new PikpakRequest(pikpak)
      .post(`/v1/auth/signin`)
      .body({
        client_id: pikpakConfig["clientId"],
        client_secret: pikpakConfig["clientSecret"],
        username: pikpak.username,
        password: pikpak.password,
        captcha_token: captchaToken,
      })
    );
    return this.indexeddbService.updatePikpakToken(pikpak, response["access_token"], response["refresh_token"], response["sub"]);
  }

  async accessTokenRenew(pikpak: Pikpak): Promise<Pikpak> {
    const response: any = await this.request(new PikpakRequest(pikpak)
      .post(`/v1/auth/token`)
      .body({
        client_id: this.settingService.getPikpakClientId(),
        refresh_token: pikpak.refreshToken,
        grant_type: 'refresh_token',
      })
    );
    return this.indexeddbService.updatePikpakToken(pikpak, response["access_token"], response["refresh_token"], response["sub"]);
  }

  private async _captchaTokenRenew(pikpak: Pikpak): Promise<string> {
    const response: PikpakCaptchaTokenResponse = await this.request(new PikpakRequest(pikpak)
      .post(`/v1/shield/captcha/init`)
      .body({
        client_id: this.settingService.getPikpakClientId(),
        action: 'POST:/v1/auth/signin',
        device_id: pikpak.deviceId,
        captcha_token: '',
        meta: {
          phone_number: pikpak.username
        }
      }),
    ) as PikpakCaptchaTokenResponse;
    return response.captcha_token;
  }

  async request(req: PikpakRequest): Promise<{[key: string]: any }>  {
    this.times++;
    if (this.times >= 6) {
      throw new Error(`Max times reached -----`);
    }
    const pikpak: Pikpak = await this.indexeddbService.getPikpakByIdMustExist(req.getPikpak().id!);
    console.log("Access token: " + pikpak.accessToken);
    const h: { [key: string]: string } = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (pikpak.accessToken) {
      h["Authorization"] = `Bearer ${pikpak.accessToken}`;
    }
    let u = req.getUrl(this.settingService.getPikpakConfig());
    let response: Observable<any>;
      switch (req.getMethod()) {
        // case 'GET':
        //   return this.http.get<any>(url, { params });
        case 'POST':
          response = this.http.post<any>(u, req.getBody(), {headers: h});
          break;
        // case 'PUT':
        //   return this.http.put<any>(url, body, { params });
        // case 'DELETE':
        //   return this.http.delete<any>(url, { params });
        default:
          Swal.fire({
            title: 'Fatal Error',
            text: `Unsupported method: ${req.getMethod()}`,
            icon: 'error',
          });
          throw new Error(`Unsupported method: ${req.getMethod()}`);
      }
      try {
        const re: Promise<any> = await firstValueFrom(response);
        this.retry = 0;
        return re;
      } catch (e: any) {
        const errorResponse: PikpakErrorResponse = e;
        if (this.retry >= 3) {
          this.retry = 0;
          throw new Error(`Max retry reached, most recent error: ${errorResponse.error_description}`);
        }
        if (errorResponse.error_code == 16) {
            this.retry++;
            console.log(`Retrying #${this.retry} for error code 16`)
            await this.accessTokenRenew(req.getPikpak());
            return this.request(req);
        } else if (errorResponse.error_code == 4126) {
            this.retry++;
            console.log(`Retrying #${this.retry} for error code 4126`)
            await this.pikpakLogin(req.getPikpak());
            return {};
        } else {
          console.log("Error");
          console.log(errorResponse);

          Swal.fire({
            title: 'Fatal Error',
            text: `Failed to make request: ${e}`,
            icon: 'error',
          });
          throw new Error(`Failed to make request: ${e}`);
        }
      }
  }
}
