import { UserInfo } from '@shared/models/auth';

export type AuthState = {
    isChecked: boolean;
    userInfo: UserInfo | null;
};
