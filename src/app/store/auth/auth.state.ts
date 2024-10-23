import { UserInfo } from '@shared/models/auth';

export type AuthState = {
  userInfo: UserInfo | null;
};
