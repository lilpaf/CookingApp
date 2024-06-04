import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequestModel } from './models/sign-up-request.model';
import { SignUpResponseData } from './models/sign-up-response.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const userData = new SignUpRequestModel(email, password);

    return this.httpClient
      .post<SignUpResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKhlb_QGWU4uG__h4bbPZInpJahVpB7qo',
        userData
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';

          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }

          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
          }

          return throwError(errorMessage);
        })
      );
  }
}
