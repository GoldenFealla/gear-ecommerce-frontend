export type UserInfo = {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
};

export type UserCredential = {
    accessToken: string;
    user: UserInfo;
};

export type LoginForm = {
    username_or_email: string;
    password: string;
};

export type RegisterForm = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
};
