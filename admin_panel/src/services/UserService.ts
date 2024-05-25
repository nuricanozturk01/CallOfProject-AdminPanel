import axios from "axios";
import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import {PREFIX} from "../util/ConnectionUtil";
import {UserUpdateDTO} from "../dto/UserUpdateDTO";
import {Role, User, UserProfile, UserProfileUpdateDTO} from "../dto/Models";

export const findUsers = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/auth/admin/find/all`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users.map((usr: any) => {
            const roles = new Array<Role>()
            usr.roles.forEach((role: any) => {
                roles.push(new Role(role.name))
            })
            return new User(usr.birth_date, usr.creation_date, usr.deleted_at, usr.email, usr.first_name,
                usr.is_account_blocked, usr.last_name, usr.middle_name, usr.user_id, usr.username, roles)
        })
    } catch (error) {
        console.log(error)
    }
}
export const findUserProfile = async (userId: string) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/auth/users/find/user/profile/id?uid=${userId}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        const object = response.data.object
        return new UserProfile(object.cv, object.profile_photo, object.about_me, object.user_rate, object.user_feedback_rate)
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = async (userUpdateDTO: UserUpdateDTO) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/auth/admin/update/user`
        console.log("URL: ", UPDATE_URL)
        const token = getUserInformationFromLocalStorage().accessToken;
        console.log(`Bearer ${token}`)

        const response = await axios.put(UPDATE_URL, userUpdateDTO, {headers: {"Authorization": `Bearer ${token}`}});
        console.log("H: ", response)
        return response
    } catch (error) {
        console.log("D: ", error)
    }
}

export const updateUserProfile = async (userUpdateDTO: UserProfileUpdateDTO, photo: File | null, cv: File | null) => {
    try {
        const formData = new FormData();

        console.log("UserUpdateDTO: ", userUpdateDTO)

        formData.append('dto', JSON.stringify(userUpdateDTO))

        if (photo) {
            formData.append('photo', photo);
        }
        if (cv) {
            formData.append('cv', cv);
        }

        const UPDATE_URL = `${PREFIX}/api/auth/users/update/user/profile`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(UPDATE_URL, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const removeUser = async (username: string) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/auth/admin/remove/user?uname=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.delete(UPDATE_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        console.log("Response: ", response.data)
        return response.data.object
    } catch (error) {

        return false
    }
}


export const logout = async () => {
    try {
        const LOGOUT_URL = `${PREFIX}/api/auth/authenticate/logout`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(LOGOUT_URL, {}, {headers: {"Authorization": `Bearer ${token}`}});

        if (response.status === 200) {
            localStorage.clear()
            return true;
        }
        return false;
    } catch (error) {

        console.log(error)
        return false;
    }
}


export const findAllUserCount = async () => {
    try {
        const ALL_USER_COUNT_URL = `${PREFIX}/api/auth/admin/find/user/all/count`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(ALL_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findNewUsersLastNday = async (day: number) => {
    try {
        const NEW_USER_COUNT_URL = `${PREFIX}/api/auth/admin/find/user/all/new?n=${day}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(NEW_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findUsersWitKeyword = async (page: number, word: string) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/auth/admin/find/all/contains/page?p=${page}&word=${word}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
