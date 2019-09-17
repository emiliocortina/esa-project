import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Session } from 'src/app/services/authentication/session';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginObject } from '../../../services/authentication/login-object';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: [ './login.page.scss' ]
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	submitted: boolean;
	public error: {
		code: number;
		message: string;
	} = null;

	constructor(
		private authenticationService: AuthenticationService,
		private storageService: StorageService,
		private toastController: ToastController,
		private formBuilder: FormBuilder,
		private router: Router,
		private apiService: ApiService
	) {}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: [ 'hola3@email.com', Validators.required ],
			password: [ 'prueba', Validators.required ]
		});
	}

	public submitLogin(): void {
		// this.apiService.request('auth/login', 'post',
		//     null, new LoginObject(this.loginForm.value)).subscribe(data => (console.log(data), err => console.log(err)));
		this.submitted = true;
		this.error = null;
		if (this.loginForm.valid) {
			this.authenticationService
				.login(new LoginObject(this.loginForm.value))
				.subscribe((data) => this.correctLogin(data), (error) => this.errorLogin(error));
		}
	}

	async errorLogin(error: any) {
		let errorMessage; 
		if (error.error && error.error.error) {
			errorMessage = error.error.error;
		} else {
			errorMessage = 'Incorrect user or password.';
		}
		const toast = await this.toastController.create({
			color: 'danger',
			message: errorMessage,
			showCloseButton: true,
			duration: 3000
		});
		toast.present();
	}

	private correctLogin(data: Session) {
		this.storageService.setCurrentSession(data);
		this.error = null;
		this.router.navigate([ '/profile' ], { replaceUrl: true });
	}
}
