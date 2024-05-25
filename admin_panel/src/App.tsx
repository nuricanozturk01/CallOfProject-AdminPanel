import React from "react";
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {PrimeReactProvider} from "primereact/api";
import MainPageComponent from "./components/main-page/MainPageComponent";
import LoginComponent from "./components/login/LoginComponent";
import UserManagementComponent from "./components/user-management/UserManagementComponent";
import UserPermissionTableComponent from "./components/assign-authorization/UserPermissionTableComponent";
import TicketsTableComponent from "./components/ticket-page/TicketsTableComponent";
import ProjectsTableComponent from "./components/projects-page/ProjectsTableComponent";
import SettingsPageComponent from "./components/settings-page/SettingsPageComponent";

const router = createBrowserRouter([
    {path: '/', element: <LoginComponent/>},
    {path: '/home', element: <MainPageComponent/>},
    {path: '/users', element: <UserManagementComponent/>},
    {path: '/user-permissions', element: <UserPermissionTableComponent/>},
    {path: '/tickets', element: <TicketsTableComponent/>},
    {path: '/settings', element: <SettingsPageComponent/>},
    {path: '/projects', element: <ProjectsTableComponent/>}
])

function App() {
    return (
        <PrimeReactProvider>
            <RouterProvider router={router}/>
        </PrimeReactProvider>
    );
}

export default App;
