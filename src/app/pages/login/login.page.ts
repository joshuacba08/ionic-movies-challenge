import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private uiService:UiService
  ) {}

  ngOnInit() {}

  submit() {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
    this.loginSubscription$ =  this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/'])
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

  ngOnDestroy(): void {
      this.loginSubscription$.unsubscribe();
  }
}
