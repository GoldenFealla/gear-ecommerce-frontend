import { UserInfo } from 'src/shared/models/auth';

export type AuthState = {
    isChecked: boolean;
    userInfo: UserInfo | null;
};
