import {Ripple} from "primereact/ripple";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {useEffect, useState} from "react";
import cop_logo from '../../assets/new_logo.png'
import './Sidebar.css'
import {getRole, getUsername} from "../../dto/UserDTO";
import {findAllOpenTickets, findOpenTicketCount} from "../../services/TicketService";

const SidebarComponent = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [openTicketCount, setOpenTicketCount] = useState<number>(0);
    const fetchData = async () => {
        setOpenTicketCount(await findOpenTicketCount())
    };
    useEffect(() => {
        fetchData()
    }, []);


    return (
        <div className="card flex">
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={() => (
                    <div
                        className="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none">
                        <div className="flex flex-column h-full">
                            <div
                                className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">

                                <a href={"/home"}>
                                        <span className="inline-flex align-items-center gap-2">
                                        <img className="cop-image" src={cop_logo} height="100px" width="1   80px"
                                             alt="cop_logo"/>
                                    </span>
                                </a>

                            </div>
                            <div className="overflow-y-auto">
                                <ul className="list-none p-3 m-0">
                                    <li>
                                        <a className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                           href={"/users"}>
                                            <i className="pi pi-users mr-2"></i>
                                            <span className="font-medium">Users</span>
                                            <Ripple/>
                                        </a>
                                    </li>
                                    {getRole() === "ROLE_ROOT" &&
                                        <li>
                                            <a href={"/user-permissions"}
                                               className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-key mr-2"></i>
                                                <span className="font-medium">Authorize Manager</span>
                                                <Ripple/>
                                            </a>
                                        </li>
                                    }
                                    <li>
                                        <a href={"/projects"}
                                           className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-folder mr-2"></i>
                                            <span className="font-medium">Projects</span>
                                            <Ripple/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={"/tickets"}
                                           className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-comments mr-2"></i>
                                            <span className="font-medium">Tickets</span>
                                            <span
                                                className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle"
                                                style={{minWidth: '1.5rem', height: '1.5rem', fontWeight: "600"}}>
                                                            {openTicketCount}
                                                        </span>
                                            <Ripple/>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={"/settings"}
                                           className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full remove-underline">
                                            <i className="pi pi-cog mr-2"></i>
                                            <span className="font-medium">Settings</span>
                                            <Ripple/>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={"/"}
                                           className="remove-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full remove-underline">
                                            <i className="pi pi-sign-out mr-2"></i>
                                            <span className="font-medium">Logout</span>
                                            <Ripple/>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div className="mt-auto">
                                <hr className="mb-3 mx-3 border-top-1 border-none surface-border"/>
                                <a v-ripple
                                   className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                    <i className="pi pi-user mr-2"></i>
                                    <span className="font-bold">{getUsername() != null ? getUsername() : ""}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
            <Button type="button" onClick={(e) => setVisible(true)} icon="pi pi-bars"
                    className="p-button-rounded p-button-outlined"
                    style={{width: '2.5rem', height: '2.5rem'}}></Button>
        </div>
    )
}

export default SidebarComponent;