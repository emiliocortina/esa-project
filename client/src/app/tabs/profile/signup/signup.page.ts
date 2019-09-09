import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SignUpObject } from 'src/app/services/authentication/SignUpObject';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private apiServ: ApiService, private authServ: AuthenticationService) { 
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRep: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.authServ.signup(new SignUpObject(this.signupForm.value));
    //this.apiServ.request("auth/signup", "post", {}, this.signupForm.value);
  }

  goToLogin() {
    this.router.navigate(['/tabs/profile/login'], { replaceUrl: true });
  }

}
