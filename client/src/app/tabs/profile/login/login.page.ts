import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginObject } from 'src/app/services/authentication/login-object';
import { Session } from 'src/app/services/authentication/session';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    login: true;
    submitted: boolean;
    error: any;

    constructor(private authenticationService: AuthenticationService, private storageService: StorageService, private router: Router) {
    }

    ngOnInit() {
    }

    public submitLogin(): void {

        this.submitted = true;
        this.error = null;
        // TODO meter formulariode login
        // if (this.loginForm.valid) {

        //     this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        //         data => this.correctLogin(data),
        //         error => this.errorLogin()
        //     );
        // }
    }
    errorLogin(): void {
        console.log('Error en el login');
    }

    private correctLogin(data: Session) {
        this.storageService.setCurrentSession(data);

        this.error = null;
        // this.router.navigate(['/home']);
        this.router.navigate(['/']);

    }

}
