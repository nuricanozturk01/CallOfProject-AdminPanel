import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import axios from "axios";
import {PREFIX} from "../util/ConnectionUtil";

export const giveAdminRole = async (username: string) => {
    try {
        const GIVE_ROLE_URL = `${PREFIX}/api/auth/root/give/role/admin?username=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(GIVE_ROLE_URL, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data.object
    } catch (error) {
        return false
    }
}


export const removeAdminRole = async (username: string) => {
    try {
        const REMOVE_ROLE_URL = `${PREFIX}/api/auth/root/remove/role/admin?username=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(REMOVE_ROLE_URL, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        console.log("AUTH: ", response.data.object)
        return response.data.object
    } catch (error) {
        return false
    }
}