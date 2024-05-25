export class UserLoginResponseDTO {
    constructor(username, accessToken, refreshToken, success, role, isLocked, userId)
    {
        this.userId = userId;
        this.isLocked = isLocked;
        this.role = role;
        this.username = username
        this.accessToken = accessToken
        this.refreshToken = refreshToken;
        this.success = success;
    }
}