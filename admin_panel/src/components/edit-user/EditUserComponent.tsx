import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {FC, useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Nullable} from "primereact/ts-helpers";
import './EditUser.css'
import cop_logo from '../../assets/new_logo.png'
import {InputSwitch, InputSwitchChangeEvent} from "primereact/inputswitch";
import {User} from "../../dto/Models";
import {UserUpdateDTO} from "../../dto/UserUpdateDTO";
import {getUserID} from "../../dto/UserDTO";
import {updateUser} from "../../services/UserService";
import {showErrorMessage, showSuccessMessage} from "../../util/Notification";
import {Toast} from "primereact/toast";

interface EditUserComponentProps {
    openUserEditDialog: boolean;
    setOpenUserEditDialog: (isOpen: boolean) => void;
    selectedUser: User | Nullable;
}

const EditUserComponent: FC<EditUserComponentProps> = ({selectedUser, openUserEditDialog, setOpenUserEditDialog}) => {
    const toastRef = useRef(null);
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [blocked, setBlocked] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<Nullable<Date>>(null);

    useEffect(() => {
        if (selectedUser) {
            setFirstName(selectedUser.first_name);
            setMiddleName(selectedUser.middle_name);
            setLastName(selectedUser.last_name);
            setEmail(selectedUser.email);
            setBlocked(selectedUser.is_account_blocked);
            setBirthDate(selectedUser.birth_date);
        }
    }, [])

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">Edit User</span>
        </div>
    );

    const update = async () => {
        if (selectedUser) {
            const updatedUser = {
                ...selectedUser,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                email: email,
                is_account_blocked: blocked,
                birth_date: birthDate
            };
            const formattedDate = `${birthDate!.getDate().toString().padStart(2, '0')}/${(birthDate!.getMonth() + 1).toString().padStart(2, '0')}/${birthDate!.getFullYear()}`;
            console.log(formattedDate); // Çıktı: 01/03/2024

            const id = getUserID()
            const dto = new UserUpdateDTO(id, updatedUser.username, updatedUser.first_name, updatedUser.middle_name,
                updatedUser.last_name, updatedUser.email, updatedUser.is_account_blocked, formattedDate)

            const result = await updateUser(dto)

            if (result) {
                if (result.data.status_code === 200) {
                    showSuccessMessage(toastRef, "Success", "User updated successfully")
                } else {
                    showErrorMessage(toastRef, "Error", "User update failed")
                }
            } else {
                showErrorMessage(toastRef, "Error", "User update failed")
            }
        }

    };
    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenUserEditDialog(false)} autoFocus/>
            <Button outlined label="Save" icon="pi pi-save" onClick={(evt) => update()} autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Toast ref={toastRef}/>
            <Dialog visible={openUserEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenUserEditDialog(false)}>

                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '700px'}}>
                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="firstName">First Name</label>
                        <InputText id="firstName" value={firstName} placeholder="First Name"
                                   onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="middleName">Middle Name</label>
                        <InputText id="middleName" placeholder="Middle Name" value={middleName}
                                   aria-describedby="username-help" onChange={(e) => setMiddleName(e.target.value)}/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" placeholder="Last Name" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="email">Email</label>
                        <InputText id="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="birthDate">Birth Date</label>
                        <Calendar id="birthDate" dateFormat="dd/mm/yy" value={birthDate}
                                  onChange={(e) => setBirthDate(e.value)}
                                  showIcon/>
                    </div>
                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label className="font-bold" htmlFor="blocked">Block User</label>
                        <InputSwitch id="blocked" checked={blocked}
                                     onChange={(e: InputSwitchChangeEvent) => setBlocked(e.value)}/>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default EditUserComponent;