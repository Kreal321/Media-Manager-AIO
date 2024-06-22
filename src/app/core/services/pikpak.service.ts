import { Injectable } from '@angular/core';
import {SettingService} from "./setting.service";
import {IndexeddbService} from "./indexeddb.service";
import {Pikpak, PikpakHistory} from "../models/pikpak.model";
import {PikpakUploadResponse} from "../models/pikpakResponse.model";
import {PikpakRequestService} from "./pikpak-request.service";
import {LoggerService} from "./logger.service";
import {PikpakRequest} from "../models/pikpakRequest.model";

@Injectable({
  providedIn: 'root'
})
export class PikpakService {

  constructor(
    private settingService: SettingService,
    private indexeddbService: IndexeddbService,
    private pikpakRequest: PikpakRequestService,
    private logger: LoggerService
  ) { }

  // Pikpak History
  async newPikpakHistory(pikpakId: number, title: string, message: string, success: boolean): Promise<void> {
    await this.indexeddbService.addPikpakHistory(new PikpakHistory(pikpakId, title, message, success));
    this.logger.info(`Pikpak Operation ${title} ${success? 'Success': 'Failed'}: ${message}`);
  }

  // Pikpak Operations
  async newPikpak(username: string, password: string): Promise<Pikpak|null> {
    const id = await this.indexeddbService.addPikpak(new Pikpak(username, password));
    // TODO: check if login success
    return this.pikpakLogin(id);
  }

  async updatePikpak(pikpak: Pikpak): Promise<Pikpak | null> {
    if (!pikpak.id) {
      this.logger.error('Pikpak ID is required to update');
      return null;
    }
    this.logger.info(`Updating Pikpak ${pikpak.id}`);
    return this.indexeddbService.updatePikpak(pikpak);
  }

  async deletePikpakById(id: number): Promise<void> {
    this.logger.info(`Deleting Pikpak ${id}`);
    await this.indexeddbService.deletePikpak(id);
  }

  async getPikpakById(id: number): Promise<Pikpak | undefined> {
    this.logger.log(`Getting Pikpak ${id}`);
    return this.indexeddbService.getPikpakById(id);
  }

  async getPikpakHistoriesById(pikpakId: number | undefined): Promise<PikpakHistory[]> {
    this.logger.log(`Getting Pikpak Histories for Pikpak ${pikpakId}`);
    return this.indexeddbService.getPikpakHistories(pikpakId);
  }

  async pikpakCreateFolder(id: number, name: string, parent_id?: string): Promise<{[key: string]: any }> {
    const pikpak: Pikpak = await this.indexeddbService.getPikpakByIdMustExist(id);
    const response: PikpakUploadResponse = await this.pikpakRequest.request(new PikpakRequest(pikpak)
      .post(`/drive/v1/files`)
      .body({
        kind: 'drive#folder',
        name: name,
        parent_id: parent_id? parent_id: null,
      })
    ) as PikpakUploadResponse;
    return response.file;
  }

  async pikpakLogin(id: number): Promise<Pikpak> {
    const pikpak: Pikpak = await this.indexeddbService.getPikpakByIdMustExist(id);
    return this.pikpakRequest.pikpakLogin(pikpak);
  }
}
