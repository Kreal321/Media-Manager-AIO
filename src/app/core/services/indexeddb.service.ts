import {Injectable} from '@angular/core';
import Dexie, {Table} from "dexie";
import {Pikpak, PikpakHistory} from "../models/pikpak.model";
import {AccountStatus} from "../enums/account-status.enum";
import Swal from "sweetalert2";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService extends Dexie {
  public pikpaks!: Table<Pikpak, number>;
  public pikpakHistories!: Table<PikpakHistory, number>;

  constructor(
    private logger: LoggerService
  ) {
    super('MediaManagerDB');
    this.version(1).stores({
      pikpaks: '++id, userId, username, password, deviceId, accessToken, refreshToken, captchaToken, status, createdAt, updatedAt',
      pikpakHistories: '++id, pikpakId, title, message, success, createdAt'
    });
    this.pikpaks = this.table('pikpaks');
    this.pikpakHistories = this.table('pikpakHistories');
    this.on('populate', () => this.populate());
  }

  async populate() {
    const pikpakId = await this.pikpaks.add({
      userId: '1123',
      username: '+1555555555',
      password: '1234567890',
      deviceId: '1234567890',
      accessToken: '1',
      refreshToken: '1',
      captchaToken: '',
      status: AccountStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await this.pikpakHistories.bulkAdd([
      {
        pikpakId: pikpakId,
        title: 'Pikpak created successfully',
        message: 'Pikpak is created successfully',
        success: true,
        createdAt: new Date()
      },
      {
        pikpakId: pikpakId,
        title: 'Pikpak updated failed',
        message: 'Pikpak failed to update',
        success: false,
        createdAt: new Date()
      }
    ]);
  }

  // Create / Add
  async addPikpak(pikpak: Pikpak): Promise<number>{
    return this.pikpaks.add(pikpak);
  }

  async addPikpakHistory(history: PikpakHistory): Promise<number> {
    return this.pikpakHistories.add(history);
  }

  // Read / Get
  async getPikpaks(): Promise<Pikpak[]> {
    return this.pikpaks.toArray();
  }

  async getPikpakById(id: number): Promise<Pikpak | undefined> {
    return this.pikpaks.get(id);
  }

  async getPikpakByIdMustExist(id: number): Promise<Pikpak> {
    const pikpak: Pikpak|undefined = await this.pikpaks.get(id);
    if (!pikpak) {
      Swal.fire({
        title: 'Fatal Error',
        text: `Pikpak not found: ${id}`,
        icon: 'error',
      });
      throw new Error(`Pikpak not found: ${id}`);
    }
    return pikpak;
  }

  async getPikpakHistories(pikpakId: number | undefined): Promise<PikpakHistory[]> {
    if (!pikpakId) {
      return [];
    }
    return this.pikpakHistories.where('pikpakId').equals(pikpakId).reverse().toArray();
  }

  // Update
  async updatePikpak(pikpak: Pikpak): Promise<Pikpak> {
    pikpak.updatedAt = new Date();
    await this.pikpaks.put(pikpak);
    return pikpak;
  }

  async updatePikpakToken(pikpak: Pikpak,accessToken?: string, refreshToken?: string, userId?: string): Promise<Pikpak> {
    const p: Pikpak = await this.getPikpakByIdMustExist(pikpak.id!);
    if (userId) {
      p.userId = userId;
    }
    if (accessToken) {
      p.accessToken = accessToken;
    }
    if (refreshToken) {
      p.refreshToken = refreshToken;
    }
    return this.updatePikpak(p);
  }

  // Delete
  async deletePikpak(id: number): Promise<void> {
    await this.pikpaks.delete(id);
  }




}
