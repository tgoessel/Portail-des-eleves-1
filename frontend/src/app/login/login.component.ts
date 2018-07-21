import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var particlesJS: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginText: string;
    loginClass: string;
    passwordText: string;
    passwordClass: string;

    constructor(private _apiService: ApiService,
        private router: Router,
        private cookieService: CookieService) { }

    ngOnInit() {
        this._apiService.checkAuthentication().subscribe(
            data => {
                // Already identified, navigate to the home page
                this.router.navigate([''])
            },
            err => {
                console.log(err);
            }
        )

        particlesJS.load('particle', 'assets/particles.json');
    }

    login() {
        var valid = true;
        if (!this.loginText) {
            valid = false
            this.loginClass = "uk-form-danger"
        } else {
            this.loginClass = ""
        }
        if (!this.passwordText) {
            valid = false
            this.passwordClass = "uk-form-danger"
        } else {
            this.passwordClass = ""
        }
        if (valid) {
            this._apiService.authenticate(this.loginText, this.passwordText).subscribe(
                data => {
                    this.loginText = "";
                    this.passwordText = "";
                    this.router.navigate([''])
                },
                err => {
                    this.passwordText = "";
                    this.loginClass = "is-invalid";
                    this.passwordClass = "is-invalid"
                }
            )
        }
    }

}