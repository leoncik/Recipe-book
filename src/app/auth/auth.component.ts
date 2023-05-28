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
    isLoading = false;

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

        this.isLoading = true;
        if (this.isLoginMode) {
            console.log('logged in!');
            this.isLoading = false;
        } else {
            this.authService.register(email, password).subscribe(
                (responseData) => {
                    console.log(responseData);
                    this.isLoading = false;
                },
                (error) => {
                    console.log(error);
                    this.isLoading = false;
                }
            );
        }
        form.reset();
    }
}
