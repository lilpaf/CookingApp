export class AuthenticationRequestModel {
  constructor(
    public email: string,
    public password: string,
    public returnSecureToken = true
  ) {}
}
