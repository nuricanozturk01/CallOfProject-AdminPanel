import {FC, useEffect, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Toast} from "primereact/toast";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Editor, EditorTextChangeEvent} from "primereact/editor";
import {TicketAnswerDTO, TicketDTO} from "../../dto/Models";
import {getUserID, getUsername} from "../../dto/UserDTO";
import {giveFeedbackForTicket} from "../../services/TicketService";
import {showSuccessMessage, showWarningMessage} from "../../util/Notification";

interface GiveFeedbackComponentProps {
    openGiveFeedbackDialog: boolean;
    setOpenGiveFeedbackDialog: (isOpen: boolean) => void;
    ticket: TicketDTO | Nullable
}


const GiveFeedbackComponent: FC<GiveFeedbackComponentProps> = ({
                                                                   openGiveFeedbackDialog,
                                                                   setOpenGiveFeedbackDialog,
                                                                   ticket
                                                               }) => {

    const toast = useRef<Toast>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [admin, setAdmin] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    useEffect(() => {

        setTitle(ticket?.title!);
        setOwner(ticket?.username!);
        setAdmin(getUsername());
        setDescription(ticket?.description!);
    }, []);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">Give Feedback</span>
        </div>
    );

    const handleSaveButton = async () => {
        if (feedback === '') {
            showWarningMessage(toast, "Warning", "Feedback can not be empty")
        } else {
            setIsLoading(true);
            const result = await giveFeedbackForTicket(new TicketAnswerDTO(ticket!.id, getUserID(), feedback, getUsername()));
            ticket!.answered_date = result!.answered_date;
            setIsLoading(false);
            showSuccessMessage(toast, "Success", "Feedback is given successfully")
        }
    };
    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenGiveFeedbackDialog(false)} autoFocus/>
            <Button loading={isLoading} outlined label="Save" icon="pi pi-save" onClick={handleSaveButton}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Toast ref={toast}/>
            <Dialog visible={openGiveFeedbackDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenGiveFeedbackDialog(false)} style={{overflow: 'auto'}}>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '10px', width: '700px'}}>

                    <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                        <label className="font-bold" htmlFor="ticketTitle">Ticket Title</label>
                        <InputText id="ticketTitle0" value={title} placeholder="Ticket Title" readOnly={true}/>
                    </div>

                    <div className="flex flex-row justify-content-around">
                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold" htmlFor="ticketOwner">Ticket
                                Owner</label>
                            <InputText id="ticketOwner" style={{width: "300px"}}
                                       placeholder="Ticket Owner" value={owner}
                                       readOnly={true}/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold"
                                   htmlFor="adminUsername">Admin</label>
                            <InputText id="adminUsername" value={admin} style={{width: "300px"}} placeholder="Admin"
                                       readOnly={true}/>
                        </div>
                    </div>


                    <div className="card flex justify-content-center" style={{marginTop: "15px", padding: "10px"}}>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={description}
                                           style={{width: '100%'}} autoResize readOnly={true}
                                           rows={10}
                                           cols={80}/>
                            <label className="font-bold" style={{fontSize: "12pt"}} htmlFor="description">Ticket Description</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center" style={{marginTop: "15px", padding: "10px"}}>
                        <Editor id="feedback" value={feedback}
                                onTextChange={(e: EditorTextChangeEvent) => setFeedback(e.htmlValue!)}
                                style={{height: '320px', width: '100%'}}/>
                    </div>

                    <br/>
                </div>
            </Dialog>
        </div>
    )
}

export default GiveFeedbackComponent;