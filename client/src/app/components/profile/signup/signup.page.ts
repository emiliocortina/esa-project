import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SignUpObject } from 'src/app/services/authentication/SignUpObject';
import { ToastController, PopoverController } from '@ionic/angular';
import { Session } from 'src/app/services/authentication/session';

export function passwordMatchValidator(psw: string, pswRep: string) {
	return function (frm) {
		let pswValue = frm.get(psw).value;
		let pswRepValue = frm.get(pswRep).value;
		if (pswValue === pswRepValue) {
			return null;
		} else {
			return { 'notMatch': 'Passwords do not match' }
		}
	}
}

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

	signupForm: FormGroup;
	currentAvatarId = 1;
	minAvatarId = 1;
	maxAvatarId = 10;

	validation_messages = {
		'name': [
			{ type: 'required', message: 'Name is required.' }
		],
		'nickname': [
			{ type: 'required', message: 'A nickname is required.' }
		],
		'email': [
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Email is not valid' },
		],
		'password': [
			{ type: 'required', message: 'Password is required' },
			{ type: 'minlength', message: 'Password must have at least 8 characters' },
			{ type: 'pattern', message: 'Password must have: uppercase letters, lowercase letters and numbers' },
		],
		'passwordRep': [
			{ type: 'required', message: 'Password repetition is required' },
			{ type: 'notMatch', message: 'Passwords do not match' }
		]
	}

	constructor(private router: Router,
		private formBuilder: FormBuilder,
		private authServ: AuthenticationService,
		private toastController: ToastController,
		private storageService: StorageService,
		public popoverController: PopoverController) { }

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			avatarId: new FormControl(),
			name: new FormControl('', Validators.required),
			nickname: new FormControl('', Validators.required),
			email: new FormControl('', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])),
			password: new FormControl('', Validators.compose([
				Validators.minLength(8),
				Validators.required,
				Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])),
			passwordRep: new FormControl('', Validators.required),
		},
			{
				validator: passwordMatchValidator('password', 'passwordRep')
			}
		);
	}

	signUp() {
		if (this.signupForm.valid) {
			this.authServ
				.signup(new SignUpObject(this.signupForm.value, this.currentAvatarId.toString()))
				.subscribe((data) => {
					this.correctSignup(data)}, (error) => this.errorSignup(error));
		}
	}

	async errorSignup(error: any) {
		let errorMessage = error.error.error_description;
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
		this.router.navigate(['/profile'], { replaceUrl: true });
	}

	goToLogin() {
		this.router.navigate(['/profile/login'], { replaceUrl: true });
	}

	previousAvatar() {
		if (this.currentAvatarId > this.minAvatarId) {
			this.currentAvatarId -= 1;
		} else {
			this.currentAvatarId = this.maxAvatarId;
		}
	}

	nextAvatar() {
		if (this.currentAvatarId < this.maxAvatarId) {
			this.currentAvatarId += 1;
		} else {
			this.currentAvatarId = this.minAvatarId;
		}
	}

}
