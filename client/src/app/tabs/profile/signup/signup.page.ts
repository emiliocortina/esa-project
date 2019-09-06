import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiServ: ApiService) { 
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.apiServ.request("auth/signup", "post", {}, this.signupForm.value);
  }

  goToLogin() {
    this.router.navigate(['/tabs/profile/login'], { replaceUrl: true });
  }

}
