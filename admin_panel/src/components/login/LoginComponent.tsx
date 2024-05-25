import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useEffect, useRef, useState} from "react";
import './Login.css'
import cop_logo from '../../assets/new_logo.png'
import {Navigate} from "react-router-dom";
import {UserLoginDTO} from "../../dto/UserLoginDTO";
import {UserDTO} from "../../dto/UserDTO";
import {LoginService} from "../../services/LoginService";
import {Toast} from "primereact/toast";
import {showErrorMessage, showSuccessMessage} from "../../util/Notification";

const LoginComponent = () => {
    const toast = useRef<Toast>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        localStorage.clear()
    }, []);
    const handleLoginBtn = async () => {
        const loginDTO = new UserLoginDTO(username, password);
        const loginResponse = await LoginService(loginDTO);

        if (loginResponse.isLocked) {
            showErrorMessage(toast, "Error", "Your account was locked!")
        } else {
            if (loginResponse.success) {
                const user = new UserDTO(username, loginResponse.accessToken, loginResponse.refreshToken, loginResponse.role, loginResponse.isLocked, loginResponse.userId)

                user.storeOnLocalStorage()
                showSuccessMessage(toast, "Success", `Welcome ${username}`)

                setTimeout(() => {
                    setSuccess(true)
                }, 2000)

            } else {
                showErrorMessage(toast, "Error", "Invalid username or password!")
            }
        }
    };


    return (
        <>
            <Toast ref={toast}/>
            <div
                className="surface-card p-4 shadow-2 border-round w-full lg:w-6 align-content-center justify-content-center center-screen">
                {success && <Navigate to={"/home"}/>}

                <div className="text-center mb-5">
                    <img src={cop_logo} alt="hyper" height={200} className="mb-3"/>
                    <div className="my-text">
                        Call-Of-Project Admin Panel
                    </div>
                </div>

                <div className="flex-column">
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="username" onChange={(e) => setUsername(e.target.value)} type="text"
                               placeholder="Username" className="w-full mb-3"/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                               className="w-full mb-3"/>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={() => handleLoginBtn()}/>
                </div>
            </div>
        </>

    );
}

export default LoginComponent;
