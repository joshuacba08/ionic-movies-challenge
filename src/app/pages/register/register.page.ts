import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({
    fname:['',[Validators.required]],
    lname:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
    passwordConfirm:['',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]],


  })

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}


  onSubmit(){
    console.log(this.registerForm)
  }

  changeField(event:any){
    console.log(event);
    console.log(this.registerForm)
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
