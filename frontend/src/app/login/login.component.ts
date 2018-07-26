import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppComponent} from "../app.component";
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

    constructor(
        private _apiService: ApiService,
        private router: Router,
        private cookieService: CookieService,
        private app : AppComponent
    ) { }

    ngOnInit() {
        this._apiService.checkAuthentication().subscribe(
            data => {
                // Already identified, navigate to the home page
                this._apiService.getUser().subscribe(user => {
                    this.app.user = user;
                    this.router.navigate([''])
                });
            },
            err => {}
        )

        particlesJS.load('particle', 'assets/particles.json');
    }

    login() {
        var valid = true;
        if (!this.loginText) {
            valid = false
            this.loginClass = "is-invalid"
        } else {
            this.loginClass = ""
        }
        if (!this.passwordText) {
            valid = false
            this.passwordClass = "is-invalid"
        } else {
            this.passwordClass = ""
        }
        if (valid) {

            return this._apiService.authenticate(this.loginText, this.passwordText).subscribe(
                data => {
                    this._apiService.getUser().subscribe(user => {
                        this.loginText = "";
                        this.passwordText = "";
                        this.router.navigate([''])
                    })
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
