export type UserInfo = {
  id: string;
  username: string;
  email: string;
};

export type UserCredential = {
  accessToken: string;
  user: UserInfo;
};

export type LoginForm = {
  username_or_email: string;
  password: string;
};
