import {Pikpak} from "./pikpak.model";

export class PikpakRequest {
  private _pikpak: Pikpak;
  private _method?: string;
  private _url?: string;

  private _params?: { [key: string]: any };
  private _body?: { [key: string]: any };

  private _retry: number = 0;

  constructor(pikpak: Pikpak) {
    this._pikpak = pikpak;
  }

  getPikpak(): Pikpak {
    return this._pikpak;
  }

  getMethod(): string {
    return this._method!;
  }

  getUrl(setting: any): string {
    if (this._url!.startsWith('/drive')) {
      return "https://" + setting['apiHost'] + this._url;
    } else {
      return "https://" + setting['userHost'] + this._url;
    }
  }

  getParams(): { [key: string]: any } {
    return this._params!;
  }

  getBody(): { [key: string]: any } {
    return this._body!;
  }

  pikpak(pikpak: Pikpak): PikpakRequest {
    this._pikpak = pikpak;
    return this;
  }

  params(params: { [key: string]: any }): PikpakRequest {
    this._params = params;
    return this;
  }

  body(body: { [key: string]: any }): PikpakRequest {
    this._body = body;
    return this;
  }

  get(url: string): PikpakRequest {
    this._url = url;
    this._method = 'GET';
    return this;
  }

  post(url: string): PikpakRequest {
    this._url = url;
    this._method = 'POST';
    return this;
  }

  retry(): PikpakRequest {
    this._retry++;
    return this;
  }
}
