import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  showPass = false;
  loginSubscription$:Subscription;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['josue.anderson@test.com', [Validators.required, Validators.email]],
    password: [
      '123456',
      [Validators.required, Validators.maxLength(50), Validators.minLength(6)],
    ],
  });
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private uiService:UiService,
  ) {}

  ngOnInit() {}

  submit() {
    if (this.loginForm.valid) {
    this.loginSubscription$ =  this.authService.login(this.loginForm.value).subscribe({
      next: async (res) => {
        await this.storageService.saveUser(res)
        this.uiService.presentToast('Wellcome to Ionic Movies 👋', 3000, 'success');
        this.router.navigate(['/home']);
      },
      error: (error) =>{
        this.uiService.presentToast('Something are wrong',3000,'danger');
      }
    });
    }
  }

  handleShowPass() {
    this.showPass = !this.showPass;
  }

  ngOnDestroy() {
      this.loginSubscription$.unsubscribe();

  }
}
