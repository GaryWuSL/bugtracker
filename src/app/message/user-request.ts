export interface UserRequest {
    UserId: number;
    UserName: string;
    UserDescription: string;
    Password: string;
    ConfirmPassword: string;
    EmailAddress: string;
    PhotoFilePath: string;
}