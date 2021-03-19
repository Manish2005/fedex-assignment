export interface ISignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISignUpFormData extends ISignUpRequest {
  confirmPassword: string;
}
