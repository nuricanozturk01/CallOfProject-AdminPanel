import {PREFIX} from "../util/ConnectionUtil";
import {UserLoginDTO} from "../dto/UserLoginDTO";
import {UserLoginResponseDTO} from "../dto/UserLoginResponseDTO";
import axios from "axios";

const LOGIN_URL = `${PREFIX}/api/auth/admin/login`
export const LoginService = async (userInput: UserLoginDTO): Promise<UserLoginResponseDTO> => {
    try {
        const response = await axios.post(LOGIN_URL, userInput);
        const responseData = response.data
        return new UserLoginResponseDTO(userInput.username, responseData.access_token, responseData.refresh_token, responseData.success, responseData.role, responseData.blocked, responseData.user_id)
    } catch (error) {
        console.log(error)
        return new UserLoginResponseDTO(userInput.username, "", "", false, "", false, "")
    }
}
