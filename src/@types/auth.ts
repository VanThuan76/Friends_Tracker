export interface IAuthenticationFirebase {
    userInfo: IUserInfo;
    error?: any;
}

export interface IUserInfo {
    idToken: string;
    serverAuthCode: null;
    scopes: string[];
    user: IUser;
}

export interface IUser {
    photo: string;
    givenName: string;
    familyName: string;
    name: string;
    email: string;
    id: string;
}