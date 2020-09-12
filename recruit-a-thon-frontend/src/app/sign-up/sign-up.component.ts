import { Component, OnInit, Input } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { User } from '../models/user';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';
import { Alerts } from '../constants/errors.constants';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup;
    public user: User;
    public userCreated: boolean = null;
    public errorMessage: string;
    public errorType: string;

    constructor(
        private formBuilder: FormBuilder,
        private signUpService: SignUpService,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            username: ['', [Validators.required, this.isUsernameTaken, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: [
                '',
                [Validators.required, this.matchConfirmPassword.bind(this)],
            ],
            contact: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        });
    }
    public get username() {
        return this.signUpForm.get('username');
    }

    public get firstname() {
        return this.signUpForm.get('firstname');
    }

    public get lastname() {
        return this.signUpForm.get('lastname');
    }

    public get password() {
        return this.signUpForm.get('password');
    }

    public get confirmPassword() {
        return this.signUpForm.get('confirmPassword');
    }

    public get contact() {
        return this.signUpForm.get('contact');
    }

    public matchConfirmPassword(
        formControl: FormControl
    ): { [s: string]: boolean } {
        if (this.signUpForm) {
            if (
                formControl.value &&
                formControl.value.length > 0 &&
                formControl.value !== this.signUpForm.get('password').value
            ) {
                return { nomatch: true };
            }
        }
        return null;
    }

    isUsernameTaken(formControl: FormControl): { [s: string]: boolean } {
        if (formControl.value === 'admin') {
            return { userNameTaken: true };
        } else {
            return null;
        }
    }

    public goToLogin(): void {
        this.router.navigate(['login']);
    }

    public addUser(): void {
        this.user = {
            id: null,
            firstName: this.signUpForm.get('firstname').value,
            lastName: this.signUpForm.get('lastname').value,
            password: this.signUpForm.get('password').value,
            userName: this.signUpForm.get('username').value,
            contactNumber: this.signUpForm.get('contact').value,
            role: undefined
        };
        this.signUpService.addUser(this.user).subscribe(
            (data) => {
                this.authService.setUserDetails(data);
                this.userCreated = true;
                this.errorType = Alerts.SUCCESS;
                this.errorMessage = 'Signed Up Successfull.' + 'Logging you in.';
                setTimeout(() => {
                    this.navigateToEditProfile();
                }, 1000);
            },
            (error) => {
                if (error.status === 500) {
                    this.errorType = Alerts.DANGER;
                    this.errorMessage = error.error.message;
                    this.userCreated = false;
                }
            }
        );
    }

    public navigateToLogin(): void {
        this.router.navigate(['login']);
    }

    public navigateToEditProfile(): void {
        this.router.navigate(['editprofile']);
    }
}
