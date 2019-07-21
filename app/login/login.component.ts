import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "gr-login",
    providers: [UserService],
    moduleId: module.id,
    styleUrls: ["./login.component.css"],
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    isLoading = false;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "keloke@eyy.comae";
        this.user.password = "mykeloke";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.isLoading = true;
        this.userService.login(this.user)
            .subscribe(
                () => { this.router.navigate(["/list"]); this.isLoading = false },
                (error) => { alert("Unfortunately we could not find your account."); this.isLoading = false }
            );
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}