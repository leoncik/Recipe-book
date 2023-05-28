import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
    isLoginMode = false;

    constructor(private authService: AuthService) {}

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm): void {
        // Add an extra check if user manages to bypass the disabled submit button.
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            console.log('logged in!');
        } else {
            this.authService.register(email, password).subscribe(
                (responseData) => {
                    console.log(responseData);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        form.reset();
    }
}
