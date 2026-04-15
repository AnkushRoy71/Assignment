export interface RegisterRequestModel {
  firstName: string;
  lastName: string;
  state: string;
  email: string;
  subscribe: boolean;
}

export interface RegisterResponseModel extends RegisterRequestModel {
  id: string;
}

export interface RegisterFormModel extends RegisterRequestModel {
  confirmEmail: string;
}
