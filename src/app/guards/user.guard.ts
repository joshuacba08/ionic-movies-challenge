import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  user: User;
  constructor(private storageService:StorageService, private router: Router){

  }

  async canLoad(): Promise<boolean | UrlTree> {
    this.user = await this.storageService.getStorageByKey('user');
    if(this.user){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }

  async canActivate(): Promise<boolean | UrlTree> {
    this.user = await this.storageService.getStorageByKey('user');
    if(this.user){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }

}
