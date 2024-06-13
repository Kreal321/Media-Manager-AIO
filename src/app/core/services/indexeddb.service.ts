import {Injectable} from '@angular/core';
import Dexie, {Table} from "dexie";
import {Pikpak, PikpakHistory} from "../models/pikpak.model";
import {AccountStatus} from "../enums/account-status.enum";

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService extends Dexie {
  public pikpaks!: Table<Pikpak, number>;
  public pikpakHistories!: Table<PikpakHistory, number>;

  constructor() {
    super('MediaManagerDB');
    this.version(1).stores({
      pikpaks: '++id, userId, username, password, deviceId, accessToken, refreshToken, status, createdAt, updatedAt',
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

  async addPikpak(pikpak: Pikpak): Promise<number | null>{
    try {
      return await this.pikpaks.add(pikpak);
    } catch (e) {
      console.error('Failed to add pikpak:', e);
      return null;
    }
  }

  async getPikpaks(): Promise<Pikpak[]> {
    return this.pikpaks.toArray();
  }

  async getPikpakById(id: number): Promise<Pikpak | undefined> {
    return this.pikpaks.get(id);
  }

  async updatePikpak(pikpak: Pikpak): Promise<number | null> {
    try {
      return await this.pikpaks.put(pikpak);
    } catch (e) {
      console.error('Failed to update pikpak:', e);
      return null;
    }
  }

  async deletePikpak(id: number): Promise<void> {
    await this.pikpaks.delete(id);
  }

  async getPikpakHistories(pikpakId: number | undefined): Promise<PikpakHistory[]> {
    if (!pikpakId) {
      return [];
    }
    return this.pikpakHistories.where('pikpakId').equals(pikpakId).reverse().toArray();
  }
}
