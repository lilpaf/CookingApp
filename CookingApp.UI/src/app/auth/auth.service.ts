import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequestModel } from './models/authentication-request.model';
import { SignUpResponseData } from './models/sign-up-response.model';
import { catchError, throwError } from 'rxjs';
import { SignInResponseData } from './models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const userData = new AuthenticationRequestModel(email, password);

    return this.httpClient
      .post<SignUpResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKhlb_QGWU4uG__h4bbPZInpJahVpB7qo',
        userData
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    const userData = new AuthenticationRequestModel(email, password);

    return this.httpClient
      .post<SignInResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKhlb_QGWU4uG__h4bbPZInpJahVpB7qo',
        userData
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials';
        break;
    }

    return throwError(errorMessage);
  }
}
