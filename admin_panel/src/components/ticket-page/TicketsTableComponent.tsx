import React, {useEffect, useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import './Ticket.css';
import SidebarComponent from "../sidebar/SidebarComponent";
import GiveFeedbackComponent from "../feedback-page/GiveFeedbackComponent";
import {findAllOpenTickets} from "../../services/TicketService";
import {TicketDTO} from "../../dto/Models";
import {Tag} from "primereact/tag";


const TicketsTableComponent = () => {
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [openGiveFeedbackDialog, setOpenGiveFeedbackDialog] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketDTO | null>(null)

    const handleGiveFeedbackBtn = (ticket: TicketDTO) => {
        setSelectedTicket(ticket)
        setOpenGiveFeedbackDialog(!openGiveFeedbackDialog)
    };
    const fetchData = async () => {
        setTickets(await findAllOpenTickets())
    };


    useEffect(() => {
        fetchData()

    }, []);

    const showGiveFeedbackElement = (ticket: TicketDTO) => {
        return <Button type="button" icon="pi pi-pencil" label={"Give Feedback"}
                       onClick={() => handleGiveFeedbackBtn(ticket)}/>

    };
    const showStatusElement = (ticket: TicketDTO) => {
        return <Tag value={ticket.status}
                    severity={ticket.status === 'OPEN' ? 'info' : ticket.status === 'CLOSED' ? 'warning' : 'danger'}/>
    };


    const showAnsweredDate = (ticket: TicketDTO) => {
        return <Tag value={ticket.answered_date ? ticket.answered_date : 'Not Answered Yet'}/>
    };
    return (
        <div className="card">
            {openGiveFeedbackDialog && <GiveFeedbackComponent ticket={selectedTicket} openGiveFeedbackDialog={openGiveFeedbackDialog}
                                                              setOpenGiveFeedbackDialog={setOpenGiveFeedbackDialog}/>}
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <div className="ticket-container card">
                <h2 style={{textAlign: 'center'}}>TICKET CONTROL PAGE</h2>
                <hr style={{color: '#BBE1FA'}}/>
                <DataTable value={tickets} paginator rows={7}
                           selectionMode="single"
                           reorderableRows={true}
                           resizableColumns={true}
                           reorderableColumns={true}
                           onRowReorder={(e) => setTickets(e.value)} tableStyle={{minWidth: '50rem'}}
                           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                           currentPageReportTemplate="{first} to {last} of {totalRecords}">

                    <Column rowReorder style={{width: '3rem'}}/>
                    <Column field="title" header="Title" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                    <Column field="username" header="Username" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="created_date" header="Created Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="answered_date" header="Answered Date" alignHeader={"center"}
                            style={{textAlign: 'center'}} body={showAnsweredDate}></Column>
                    <Column field="feedback_deadline" header="Feedback Deadline Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="status" header="Status" alignHeader={"center"}
                            style={{textAlign: 'center'}} body={showStatusElement}></Column>
                    <Column field="giveFeedback" alignHeader={"center"} style={{textAlign: 'center'}}
                            body={showGiveFeedbackElement}></Column>
                </DataTable>
            </div>
        </div>

    );
}

export default TicketsTableComponent;
