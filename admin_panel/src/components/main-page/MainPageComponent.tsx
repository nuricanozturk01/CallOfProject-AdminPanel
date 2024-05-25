import SidebarComponent from "../sidebar/SidebarComponent";
import "./MainPage.css";
import {useEffect, useState} from "react";
import {findAllUserCount} from "../../services/UserService";
import {findAllProjectCount} from "../../services/ProjectService";
import {findClosedTicketCount, findOpenTicketCount} from "../../services/TicketService";

export default function MainPageComponent() {
    const [userCount, setUserCount] = useState<number>(0)
    const [projectCount, setProjectCount] = useState<number>(0)
    const [openedTicketCount, setOpenedTicketCount] = useState<number>(0)
    const [closedTicketCount, setClosedTicketCount] = useState<number>(0)

    const fetchData = async () => {
        setUserCount(await findAllUserCount())
        setProjectCount(await findAllProjectCount())
        setClosedTicketCount(await findOpenTicketCount())
        setOpenedTicketCount(await findClosedTicketCount())
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="main-page-container">
            <SidebarComponent/>

            <div className="statics-container grid">
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Users</span>
                                <div className="text-900 font-medium text-xl">{userCount} Active Users</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-user text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Projects</span>
                                <div className="text-900 font-medium text-xl">{projectCount} Total Project</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-file text-orange-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Opened Tickets</span>
                                <div className="text-900 font-medium text-xl">{openedTicketCount} Read</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-ticket text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Closed Tickets</span>
                                <div className="text-900 font-medium text-xl">{closedTicketCount} Unread</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-ticket text-purple-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
        