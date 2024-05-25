import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import './Projects.css'
import SidebarComponent from "../sidebar/SidebarComponent";
import ProjectUpdateComponent from "../project-update/ProjectUpdateComponent";
import {ProjectDTO} from "../../dto/ProjectDTO";
import {findAllProjectsByPage} from "../../services/ProjectService";
import {Tag} from "primereact/tag";

const ProjectsTableComponent = () => {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);


    const handleEditProjectBtn = (project: ProjectDTO) => {
        setSelectedProject(project)
        setIsOpen(!isOpen)
    };

    const fetchData = async () => {
        const projects: ProjectDTO[] = await findAllProjectsByPage()
        setProjects(projects)

    }

    useEffect(() => {
        fetchData()
    }, []);

    const projectEditBody = (project: ProjectDTO) => {
        return <Button type="button" onClick={() => handleEditProjectBtn(project)} icon="pi pi-pencil" rounded
                       outlined/>
    }

    const getTagSeverity = (project_status: string) => {
        switch (project_status) {
            case 'APPLICATION_FEEDBACK_TIMEOUT':
                return 'danger'
            case 'CANCELED':
                return 'danger'
            case 'EXTEND_APPLICATION_FEEDBACK':
                return 'info'
            case 'FAILED':
                return 'danger'
            case 'FINISHED':
                return 'success'
            case 'IN_PROGRESS':
                return 'info'
            case 'NOT_STARTED':
                return 'warning'
            case 'TIMEOUT':
                return 'danger'
            default:
                return 'warning'
        }
    };
    const projectStatusElement = (project: ProjectDTO) => {

        return <Tag value={project.project_status} severity={getTagSeverity(project.project_status)}
                    style={{fontSize: '10pt'}}/>
    };


    const maxParticipantsElement = (project: ProjectDTO) => {
        return <Tag value={project.current_participants + "/" + project.max_participants} severity="info"
                    style={{fontSize: '10pt'}}/>
    };
    return (
        <div className="card">
            {isOpen && <ProjectUpdateComponent project={selectedProject} openProjectEditDialog={isOpen}
                                               setOpenProjectEditDialog={setIsOpen}/>}
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <div className="projects-container">
                <h2 style={{textAlign: 'center'}}>PROJECT CONTROL PAGE</h2>
                <hr style={{color: '#BBE1FA'}}/>
                <DataTable value={projects} paginator rows={7}
                           selectionMode="single"
                           reorderableRows={true}
                           resizableColumns={true}
                           reorderableColumns={true}
                           onRowReorder={(e) => setProjects(e.value)} tableStyle={{minWidth: '50rem'}}
                           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                           currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column rowReorder style={{width: '3rem'}}/>
                    <Column field="project_name" header="Title" alignHeader={"center"}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                    <Column field="project_owner" header="Owner" alignHeader={"center"}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                    <Column field="project_status" header="Status" alignHeader={"center"} body={projectStatusElement}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                    <Column field="start_date" header="Start Date" alignHeader={"center"}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                    <Column field="max_participants" header="Participant" alignHeader={"center"}
                            body={maxParticipantsElement}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                    <Column field="edit" header="Edit" alignHeader={"center"} body={projectEditBody}
                            style={{textAlign: 'center', fontWeight: "bold"}}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default ProjectsTableComponent;