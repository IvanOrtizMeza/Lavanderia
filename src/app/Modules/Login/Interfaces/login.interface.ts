import { User } from '../../../Auth/user.interface';

export type { User };

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
}
