import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import './UsersTable.css';
import EditUserComponent from "../edit-user/EditUserComponent";
import UserProfileComponent from "../user-profile/UserProfileComponent";
import {findUsers, removeUser} from "../../services/UserService";
import {User} from "../../dto/Models";
import {InputSwitch} from "primereact/inputswitch";
import {Button} from "primereact/button";
import {Nullable} from "primereact/ts-helpers";
import {showErrorMessage, showInfoMessage, showSuccessMessage} from "../../util/Notification";
import {Toast} from "primereact/toast";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";

const UsersTableComponent = () => {
    const [openUserEditDialog, setOpenUserEditDialog] = useState<boolean>(false);
    const [openUserProfileEditDialog, setOpenUserProfileEditDialog] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | Nullable>(null);
    const toast = useRef<Toast>(null);
    const handleUserEditBtn = (user: User) => {
        setSelectedUser(user)
        setOpenUserEditDialog(!openUserEditDialog)
    };
    const handleUserProfileEditBtn = (user: User) => {
        setSelectedUser(user)
        setOpenUserProfileEditDialog(!openUserProfileEditDialog)
    };


    const reject = () => {
        showInfoMessage(toast, "Rejected", "User not removed")
    };

    const fetchData = async () => {
        setUsers(await findUsers())
    };
    useEffect(() => {
        fetchData()
    }, []);

    const userBlockedTemplate = (rowData: any) => {
        return <div>
            <InputSwitch checked={rowData.is_account_blocked}/>
        </div>;
    }

    const userDeletedAtTemplate = (rowData: any) => {
        return <div>
            <InputSwitch checked={rowData.deleted_at}/>
        </div>;
    }
    const userEditTemplate = (user: User) => {
        return <Button type="button" icon="pi pi-pencil" onClick={() => handleUserEditBtn(user)} rounded outlined/>
    };
    const userProfileEditTemplate = (user: User) => {
        return <Button type="button" severity="help" onClick={() => handleUserProfileEditBtn(user)}
                       icon="pi pi-pencil" rounded outlined/>
    };

    const confirmRemoveUser = async () => {
        try {
            const isRemoved = await removeUser(selectedUser!.username);
            if (isRemoved) {
                showSuccessMessage(toast, "Success", "User removed successfully")
            } else showErrorMessage(toast, "Permission Denied", "Permission denied!")
        } catch (error) {
            showErrorMessage(toast, "Permission Denied", "Permission denied!")
        }
    };


    const handleRemoveButton = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to remove user?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: () => {
                confirmRemoveUser()
            },
            reject
        });
    };
    const removeTemplate = () => {
        return <Button type="button" severity="danger" icon="pi pi-trash" onClick={handleRemoveButton} rounded
                       outlined/>
    };


    return (
        <div className="users-container card">
            <ConfirmPopup/>
            <Toast ref={toast}></Toast>
            {openUserEditDialog &&
                <EditUserComponent selectedUser={selectedUser} openUserEditDialog={openUserEditDialog}
                                   setOpenUserEditDialog={setOpenUserEditDialog}/>}
            {openUserProfileEditDialog &&
                <UserProfileComponent selectedUser={selectedUser} openUserProfileEditDialog={openUserProfileEditDialog}
                                      setOpenUserProfileEditDialog={setOpenUserProfileEditDialog}/>}
            <h2 style={{textAlign: 'center'}}>USER CONTROL PAGE</h2>
            <hr style={{color: '#BBE1FA'}}/>
            <DataTable value={users} paginator rows={7}
                       selectionMode="single"
                       reorderableRows={true}
                       resizableColumns={true}
                       reorderableColumns={true}
                       onRowReorder={(e) => setUsers(e.value)} tableStyle={{minWidth: '50rem'}}
                       paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                       currentPageReportTemplate="{first} to {last} of {totalRecords}">

                <Column rowReorder style={{width: '3rem'}}/>
                <Column field="username" header="Username" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="email" header="Email" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="creationDateStr" header="Creation Date" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="is_account_blocked" header="Is Blocked" alignHeader={"center"} body={userBlockedTemplate}
                        style={{textAlign: 'center'}}></Column>
                <Column field="deleted_at" header="Is Removed" alignHeader={"center"} body={userDeletedAtTemplate}
                        style={{textAlign: 'center'}}></Column>
                <Column field="edit" header="User Edit" alignHeader={"center"} style={{textAlign: 'center'}}
                        body={userEditTemplate}/>
                <Column field="profileEdit" header="Profile Edit" alignHeader={"center"}
                        body={(evt) => userProfileEditTemplate(evt)}
                        style={{textAlign: 'center'}}></Column>
                <Column field="remove" header="Remove" alignHeader={"center"} style={{textAlign: 'center'}}
                        body={removeTemplate}>
                </Column>
            </DataTable>
        </div>
    );
}

export default UsersTableComponent;