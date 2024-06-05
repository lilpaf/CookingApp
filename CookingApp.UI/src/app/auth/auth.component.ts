import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SignInResponseData } from './models/sign-in-request.model';
import { SignUpResponseData } from './models/sign-up-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let authObservable: Observable<SignInResponseData | SignUpResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(this.email, this.password);
    } else {
      authObservable = this.authService.signUp(this.email, this.password);
    }

    authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
