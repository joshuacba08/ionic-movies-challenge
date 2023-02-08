import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { UiService } from './services/ui.service';
import { Router } from '@angular/router';

interface Page{
  title: string;
  url: string;
  icon: string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Logout', url: 'login', icon: 'power' },
    { title: 'Home', url: 'home', icon: 'home' }
  ];
  constructor(private storageService:StorageService, private uiService:UiService, private router:Router) {}

  async goTo(page:Page){
    if(page.title === 'Logout'){
      await this.storageService.deleteStorage();
      this.uiService.presentToast('See You soon 👋',3000, 'primary')
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([page.url]);
    }
  }
}
