export interface TokenResponse {
    AccessToken: string;
    UserId: number
	UserName: string;
    UserDescription: string;
	EmailAddress: string;
    PhotoFilePath: string;
    Success: boolean;
    ErrorCode: string;
    Error: string;
}