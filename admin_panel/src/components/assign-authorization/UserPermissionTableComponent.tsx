import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import './UsersPermissionTable.css';
import SidebarComponent from "../sidebar/SidebarComponent";
import {Tag} from "primereact/tag";
import {findUsers} from "../../services/UserService";
import {Role, User} from "../../dto/Models";
import {getRole} from "../../dto/UserDTO";
import {Toast} from "primereact/toast";
import {giveAdminRole, removeAdminRole} from "../../services/RoleManagementService";
import {showErrorMessage, showInfoMessage, showSuccessMessage, showWarningMessage} from "../../util/Notification";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const UserPermissionTableComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const toast = useRef<Toast>(null);
    const [currentUserRole, setCurrentUserRole] = useState<string>("");

    const handleGiveAdminRoleButton = async (user: User) => {
        try {
            const role = getRole()
            if (role !== "ROLE_ROOT") {
                showErrorMessage(toast, "Error", `Permission Denied!`)
                return
            }
            const result = await giveAdminRole(user.username);

            if (result === true) {
                const updatedUsers = users.map(u => {
                    if (u.username === user.username) {
                        u.roles.push(new Role("ROLE_ADMIN"))
                    }
                    return u;
                });
                setUsers(updatedUsers);
                showSuccessMessage(toast, "Success", `Admin role assigned to ${user.username}`)
            } else showInfoMessage(toast, "Information", `${user.username} has admin role already!`)
        } catch (error) {
            showWarningMessage(toast, "Error", `Admin role assigned operation failed!`)
        }
    };

    const handleRemoveAdminRole = async (user: User) => {
        try {
            const role = getRole()
            if (role !== "ROLE_ROOT") {
                showErrorMessage(toast, "Error", `Permission Denied!`)
                return
            }
            const result = await removeAdminRole(user.username);
            if (result === true) {

                const updatedUsers = users.map((usr) => {
                    if (usr.user_id === user.user_id) {
                        usr.roles = usr.roles.filter(role => role.name !== "ROLE_ADMIN")
                    }
                    return usr
                })

                setUsers(updatedUsers);
                showSuccessMessage(toast, "Success", `Admin role removed from ${user.username}`)
            } else {
                showInfoMessage(toast, "Information", `${user.username} has not admin role!`)
            }
        } catch (error) {
            showErrorMessage(toast, "Error", `Admin role removed operation failed!`)
        }
    };
    const fetchData = async () => {
        const newUsers = await findUsers();
        setUsers(newUsers)
        setCurrentUserRole(getRole())
    };

    useEffect(() => {
        fetchData()
    }, []);

    const showRolesElements = (role: User) => {
        return role.roles.map((role, index) => {
            return <Tag key={index} className="my-tag"
                        severity={role.name === "ROLE_ROOT" ? 'danger' : role.name === "ROLE_ADMIN" ? 'warning' : 'info'}
                        value={role.name}></Tag>
        })
    };
    const showGiveAdminRoleElement = (user: User) => {
        if (!user.roles.some(role => role.name === "ROLE_ROOT")) {
            return <Button severity="success" label="Give Role" onClick={() => handleGiveAdminRoleButton(user)}
                           outlined/>
        }
        return <Button severity="success" label="Give Role" disabled outlined/>
    };

    const showRemoveAdminRoleElement = (user: User) => {
        if (!user.roles.some(role => role.name === "ROLE_ROOT")) {
            return <Button severity="danger" label="Remove Role" onClick={() => handleRemoveAdminRole(user)} outlined/>
        }
        return <Button severity="danger" label="Remove Role" disabled outlined/>
    };


    return (
        <div className="card">
            <Toast ref={toast}/>
            <div className="my-navbar">
                <SidebarComponent/>
            </div>

                {currentUserRole !== "ROLE_ROOT" ? <div className="permission-denied card"><p>Permission Denied!</p></div> :
                <div className="users-container card">
                    <h2 style={{textAlign: 'center'}}>AUTHORIZATION CONTROL PAGE</h2>
                    <hr style={{color: '#BBE1FA'}}/>
                    <DataTable className="centered-header" value={users} paginator rows={7}
                               selectionMode="single"
                               reorderableRows={true}
                               resizableColumns={true}
                               reorderableColumns={true}
                               onRowReorder={(e) => setUsers(e.value)}
                               paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}">
                        <Column rowReorder/>
                        <Column field="username" header="Username" alignHeader={"center"}
                                style={{textAlign: 'center'}}></Column>
                        <Column alignHeader={"center"} field="roles" header="Roles" style={{textAlign: 'center'}}
                                body={showRolesElements}></Column>
                        <Column field="giveAdminRole" header="Give Admin Role" body={showGiveAdminRoleElement}></Column>
                        <Column field="removeAdminRole" header="Remove Admin Role"
                                body={showRemoveAdminRoleElement}></Column>
                    </DataTable>
                </div>}
        </div>);
}

export default UserPermissionTableComponent;