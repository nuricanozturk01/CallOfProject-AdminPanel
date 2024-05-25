import React from 'react';
import './UserManagementComponent.css';
import UsersTableComponent from "../user-list/UsersTableComponent";
import SidebarComponent from "../sidebar/SidebarComponent";

const UserManagementComponent = () => {
    return (
        <div className="card">
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <UsersTableComponent/>
        </div>
    )
}

export default UserManagementComponent;