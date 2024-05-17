export class SignUpRequestModel {
  constructor(
    public email: string,
    public password: string,
    public returnSecureToken = true
  ) {}
}
