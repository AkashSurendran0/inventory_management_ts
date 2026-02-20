export interface IVerifyLogin {
    verifyLogin(email:string, password:string): Promise<{accessToken:string, refreshToken:string}>
}