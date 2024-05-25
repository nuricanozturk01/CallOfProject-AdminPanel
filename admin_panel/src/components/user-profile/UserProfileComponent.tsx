import {FC, useEffect, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Image} from 'primereact/image';
import {Toast} from "primereact/toast";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {findUserProfile, updateUserProfile} from "../../services/UserService";
import {User, UserProfile, UserProfileUpdateDTO} from "../../dto/Models";
import {showErrorMessage} from "../../util/Notification";
import {CURRENT_USER} from "../../util/Constants";

interface EditUserComponentProps {
    openUserProfileEditDialog: boolean;
    setOpenUserProfileEditDialog: (isOpen: boolean) => void;
    selectedUser: User | Nullable;
}

const UserProfileComponent: FC<EditUserComponentProps> = ({
                                                              selectedUser,
                                                              openUserProfileEditDialog,
                                                              setOpenUserProfileEditDialog
                                                          }) => {
    const toast = useRef<Toast>(null);
    const [aboutMe, setAboutMe] = useState<string>("");
    const [userProfile, setUserProfile] = useState<UserProfile | Nullable>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null);
    const [userRate, setUserRate] = useState<number>(0);
    const [feedbackRate, setFeedbackRate] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRoot, setIsRoot] = useState<boolean>(false);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
    const [cvUrl, setCvUrl] = useState<string>("");
    const handleSave = async () => {
        try {
            setIsLoading(true);
            const result = await updateUserProfile(new UserProfileUpdateDTO(aboutMe, selectedUser!.user_id, userRate, feedbackRate), photo, cv);
            setProfilePhotoUrl(result.object.profile_photo)
            setCvUrl(result.object.cv)
            setIsLoading(false);
            toast.current?.show({severity: 'success', summary: 'Success', detail: 'Profile updated successfully'});
        } catch (error) {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to update profile'});
        }
    };

    const fetchData = async () => {
        const profile = await findUserProfile(selectedUser!.user_id);
        setUserProfile(profile)
        setAboutMe(profile?.about_me)
        setUserRate(profile!.user_rate)
        setFeedbackRate(profile!.user_feedback_rate)
        setCvUrl(profile!.cv)
        setProfilePhotoUrl(profile?.profile_photo!)

    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER)!);
        if (currentUser.role === "ROLE_ROOT") {
            fetchData()
        } else if (!selectedUser?.roles.some(role => role.name === "ROLE_ROOT"))
            fetchData()
        else setIsRoot(true)

    }, [])

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">{selectedUser!.username}</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenUserProfileEditDialog(false)} autoFocus/>
            <span>
                <Button loading={isLoading} outlined label="Save" icon="pi pi-save" onClick={() => handleSave()}
                        autoFocus/>
            </span>

        </div>

    );


    const userOrAdmin = (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openUserProfileEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenUserProfileEditDialog(false)} style={{overflow: 'auto'}}>
                <div className="card flex justify-content-center">
                    <Image src={profilePhotoUrl} alt="Image" width="200"/>
                </div>
                <br/>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files![0];
                        setPhoto(file);
                    }}/>
                </div>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '700px'}}>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">User Rate</label>
                            <InputNumber inputId="horizontal-buttons" value={userProfile?.user_rate}
                                         showButtons buttonLayout="horizontal"
                                         step={0.5}
                                         max={10} min={0}
                                         mode="decimal"
                                         onValueChange={(e: InputNumberValueChangeEvent) => setUserRate(e.value!)}
                                         decrementButtonClassName="p-button-danger"
                                         incrementButtonClassName="p-button-primary"
                                         incrementButtonIcon="pi pi-plus"
                                         decrementButtonIcon="pi pi-minus"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Feedback
                                Rate</label>
                            <InputNumber inputId="horizontal-buttons" value={userProfile?.user_feedback_rate}
                                         showButtons buttonLayout="horizontal"
                                         step={0.5}
                                         max={10} min={0}
                                         onValueChange={(e: InputNumberValueChangeEvent) => setFeedbackRate(e.value!)}
                                         decrementButtonClassName="p-button-danger"
                                         incrementButtonClassName="p-button-primary"
                                         incrementButtonIcon="pi pi-plus"
                                         decrementButtonIcon="pi pi-minus"/>
                        </div>
                    </div>

                    <div className="card flex justify-content-center" style={{margin: '15px', textAlign: 'center'}}>
                        <span className="p-float-label">
                            <InputTextarea id="aboutMe" value={aboutMe}
                                           onChange={(e) => setAboutMe(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="aboutMe">About me</label>
                        </span>
                    </div>

                    <br/>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label className="font-bold" htmlFor="cv">Upload CV</label>
                            <input type="file" accept="application/pdf" onChange={(e) => {
                                const file = e.target.files![0];
                                setCv(file);
                            }}/>
                        </div>


                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label className="font-bold" htmlFor="downloadCv">Download CV</label>

                            <a href={userProfile?.cv} download style={{color: "black"}}>
                                <Button disabled={cvUrl == null} label="Download" icon="pi pi-download"
                                        className="p-button-primary"/>
                            </a>

                        </div>

                    </div>


                </div>
            </Dialog>
        </div>
    );

    const showRootErrorMessage = () => {
        showErrorMessage(toast, "Permission Denied", "You cannot edit the 'Root' user")
    }
    return (
        <>
            <Toast ref={toast}></Toast>

            {isRoot ? showRootErrorMessage() : userOrAdmin}
        </>

    )
}

export default UserProfileComponent;