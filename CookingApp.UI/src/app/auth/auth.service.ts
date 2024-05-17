import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequestModel } from './models/sign-up-request.model';
import { SignUpResponseData } from './models/sign-up-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const userData = new SignUpRequestModel(email, password);

    return this.httpClient.post<SignUpResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKhlb_QGWU4uG__h4bbPZInpJahVpB7qo',
      userData
    );
  }
}
