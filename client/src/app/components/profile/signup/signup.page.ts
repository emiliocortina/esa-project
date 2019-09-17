import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SignUpObject } from 'src/app/services/authentication/SignUpObject';
import { ToastController } from '@ionic/angular';
import { Session } from 'src/app/services/authentication/session';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  signupForm: FormGroup;

  public error: {
		code: number;
		message: string;
	} = null;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private authServ: AuthenticationService,
    private toastController: ToastController,
    private storageService: StorageService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordRep: new FormControl('', Validators.required),
    });
  }

  signUp() {
		this.error = null;
		if (this.signupForm.valid) {
			this.authServ
				.signup(new SignUpObject(this.signupForm.value))
				.subscribe((data) => this.correctSignup(data), (error) => this.errorSignup(error));
		} else {
      console.log(this.signupForm.errors);
    }
  }

  async errorSignup(error: any) {
		let errorMessage;
		if (error.error && error.error.error) {
			errorMessage = error.error.error;
		} else {
			errorMessage = 'Cannot signup';
		}
		const toast = await this.toastController.create({
			color: 'danger',
			message: errorMessage,
			showCloseButton: true,
			duration: 3000
		});
		toast.present();
	}

	private correctSignup(data: Session) {
		this.storageService.setCurrentSession(data);
		this.error = null;
		this.router.navigate([ '/tabs/profile' ], { replaceUrl: true });
	}

  goToLogin() {
    this.router.navigate(['/tabs/profile/login'], { replaceUrl: true });
  }
}
