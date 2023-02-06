import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  showErrorEmail=false;
  registerSubscription$: Subscription;
  registerForm: FormGroup = this.formBuilder.group({
    fname:['',[Validators.required]],
    lname:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
    passwordConfirm:['',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]],


  })

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private uiService:UiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}


  onSubmit(){


    if(this.registerForm.status === 'VALID'){
      const { fname:first, lname:last,email, password } = this.registerForm.value;

      const data = {
        name:{
          first,
          last
        },
        email,
        password,
        image:'https://res.cloudinary.com/ionicimagesbank/image/upload/v1675629518/trainingAssets/default-image-icon-missing-picture-page-vector-40546530_rsdqhb.jpg',
        role:'ROLE_USER'
      }

      this.registerSubscription$ = this.authService.register(data).subscribe({
        next:()=>{ this.uiService.presentToast('Your account was successfully registered',3000,'success');this.router.navigate([''])},
        error:()=>this.uiService.presentToast('Internal Error',3000,'danger')
      })
    }else{
      this.uiService.presentToast('It is necessary to complete the form',3000,'danger')
    }
  }

  verifyPass(event:any){
    console.log(this.registerForm.value.password,event.target.value)
    this.showErrorEmail = this.registerForm.value.password !== event.target.value;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {

  }
}
