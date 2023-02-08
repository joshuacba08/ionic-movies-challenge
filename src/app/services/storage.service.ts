import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveToken(token: string) {
    await this._storage?.set('token', token);
  }

  async saveUser(user: User) {
    await this._storage?.set('user', user);
  }

  async getStorageByKey(key: string) {
    return await this.storage.get(key);
  }

  async deleteStorage() {
    console.log(this._storage);
    await this._storage?.clear();
    this.router.navigate(['/auth/login']);
  }
}
