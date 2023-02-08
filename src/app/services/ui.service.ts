import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loading: HTMLIonLoadingElement;
  toast:HTMLIonToastElement;
  constructor(
               private alertController: AlertController,
               private loadingController: LoadingController,
               private toastController: ToastController
             ){}

  async infoAlert( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading( message: string ) {
    this.loading = await this.loadingController.create({
      message: message,
    });
    await this.loading.present();
  }

  async dismissLoading(){
    this.loading.dismiss();
  }

  async presentToast( message: string, duration: number, color:string) {
    this.toast = await this.toastController.create({
      message,
      duration,
      color
    });

    await this.toast.present();
  }


  //solo en casos en los cuales el loading no funcione, se puede obtener un loading que habite dentro del componente en cuestión
  async getLoading( message: string ){
      return await this.loadingController.create({
        message: message,
      });
  }
}
