import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }

  getSetting(key: string): string | null {
    return localStorage.getItem(key);
  }

  setSetting(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeSetting(key: string): void {
    localStorage.removeItem(key);
  }

  // Cloudflare

  getCloudflareUrl(): string {
    return this.getSetting('cloudflareUrl') || '';
  }

  setCloudflareUrl(value: string): void {
    this.setSetting('cloudflareUrl', value);
  }

  removeCloudflareUrl(): void {
    this.removeSetting('cloudflareUrl');
  }

  // Prowlarr

  getProwlarrUrl(): string {
    return this.getSetting('prowlarrUrl') || '';
  }

  setProwlarrUrl(value: string): void {
    this.setSetting('prowlarrUrl', value);
  }

  removeProwlarrUrl(): void {
    this.removeSetting('prowlarrUrl');
  }

  // Pikpak

  setPikpakConfig(apiHost: string, userHost: string, clientId: string, clientSecret: string): void {
    this.setSetting('pikpakConfig', JSON.stringify({
      "apiHost": apiHost,
      "userHost": userHost,
      "clientId": clientId,
      "clientSecret": clientSecret
    }));
  }

  getPikpakConfig(): any {
    const config = this.getSetting('pikpakConfig');
    if (config) {
      return JSON.parse(config);
    }
    return {
      apiHost: '',
      userHost: '',
      clientId: '',
      clientSecret: ''
    };
  }

  getPikpakApiHost(): string {
    return this.getPikpakConfig()['apiHost'];
  }

  getPikpakUserHost(): string {
    return this.getPikpakConfig()['userHost'];
  }

  getPikpakClientId(): string {
    return this.getPikpakConfig()['clientId'];
  }

  getPikpakClientSecret(): string {
    return this.getPikpakConfig()['clientSecret'];
  }
}
