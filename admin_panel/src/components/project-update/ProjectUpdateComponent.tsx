import {FC, useEffect, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {Image} from "primereact/image";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {ProjectDTO} from "../../dto/ProjectDTO";
import {updateProject} from "../../services/ProjectService";
import {toDateObject} from "../../util/Constants";

interface EditProjectComponentProps {
    openProjectEditDialog: boolean;
    setOpenProjectEditDialog: (isOpen: boolean) => void;
    project: ProjectDTO | Nullable;
}

interface Type {
    name: string;
    code: string;
}

const ProjectUpdateComponent: FC<EditProjectComponentProps> = ({
                                                                   openProjectEditDialog,
                                                                   setOpenProjectEditDialog,
                                                                   project
                                                               }) => {
    const toast = useRef<Toast>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [projectStatus, setProjectStatus] = useState<Type | null>(null);
    const [projectProfessionalLevel, setProjectProfessionalLevel] = useState<Type | null>(null);
    const [recommendedDegree, setRecommendedDegree] = useState<Type | null>(null);
    const [projectLevel, setProjectLevel] = useState<Type | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [projectImage, setProjectImage] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [aim, setAim] = useState<string>("");
    const [startDate, setStartDate] = useState<Nullable<Date>>(null);
    const [completionDate, setCompletionDate] = useState<Nullable<Date>>(null);
    const [applicationDeadline, setApplicationDeadline] = useState<Nullable<Date>>(null);
    const [expectedCompletionDate, setExpectedCompletionDate] = useState<Nullable<Date>>(null);

    const projectStatusOptions: Type[] = [
        {name: 'NOT_STARTED', code: 'NOT_STARTED'},
        {name: 'IN_PROGRESS', code: 'IN_PROGRESS'},
        {name: 'FINISHED', code: 'FINISHED'},
        {name: 'CANCELED', code: 'CANCELED'},
        {name: 'FAILED', code: 'FAILED'},
        {name: 'TIMEOUT', code: 'TIMEOUT'},
        {name: 'APPLICATION_FEEDBACK_TIMEOUT', code: 'APPLICATION_FEEDBACK_TIMEOUT'},
        {name: 'EXTEND_APPLICATION_FEEDBACK', code: 'EXTEND_APPLICATION_FEEDBACK'},
    ];

    const projectProfessionalLevelOptions: Type[] = [
        {name: 'Entry_Level', code: 'Entry_Level'},
        {name: 'Intermediate', code: 'Intermediate'},
        {name: 'Expert', code: 'Expert'},
    ];

    const degreeOptions: Type[] = [
        {name: 'BACHELOR', code: 'BACHELOR'},
        {name: 'MASTER', code: 'MASTER'},
        {name: 'PHD', code: 'PHD'},
    ];

    const projectLevelOptions: Type[] = [
        {name: 'ENTRY_LEVEL', code: 'ENTRY_LEVEL'},
        {name: 'INTERMEDIATE', code: 'INTERMEDIATE'},
        {name: 'EXPERT', code: 'EXPERT'}
    ];


    useEffect(() => {
        if (project) {
            if (project.project_status) {
                const statusOption = projectStatusOptions.find(option => option.code === project.project_status);
                if (statusOption) {
                    setProjectStatus(statusOption);
                }
            }

            if (project.profession_level) {
                const levelOption = projectProfessionalLevelOptions.find(option => option.code === project.profession_level);
                if (levelOption) {
                    setProjectProfessionalLevel(levelOption);
                }
            }

            if (project.degree) {
                const degreeOption = degreeOptions.find(option => option.code === project.degree);
                if (degreeOption) {
                    setRecommendedDegree(degreeOption);
                }
            }

            if (project.project_level) {
                const levelOption = projectLevelOptions.find(option => option.code === project.project_level);
                if (levelOption) {
                    setProjectLevel(levelOption);
                }
            }
            setProjectImage(project.project_image_path!)
            setProjectName(project.project_name);
            setSummary(project.project_summary);
            setDescription(project.description);
            setAim(project.project_aim);
            setStartDate(project.startDateObj);

            if (project.completionDateObj)
                setCompletionDate(project.completionDateObj);

            setApplicationDeadline(project.applicationDeadlineObj);
            setExpectedCompletionDate(project.expectedCompletionDateObj);
        }
    }, [])

    const getFormattedDate = (date: Date): string => {
        return `${date!.getDate().toString().padStart(2, '0')}/${(date!.getMonth() + 1).toString().padStart(2, '0')}/${date!.getFullYear()}`;
    }
    const handleUpdateProject = async () => {

        setIsLoading(true);
        project!.project_status = projectStatus!.code;
        project!.profession_level = projectProfessionalLevel!.code;
        project!.degree = recommendedDegree!.code;
        project!.project_level = projectLevel!.code;
        project!.project_name = projectName;
        project!.project_summary = summary;
        project!.description = description;
        project!.project_aim = aim;
        project!.start_date = getFormattedDate(startDate!);
        project!.application_deadline = getFormattedDate(applicationDeadline!);
        project!.expected_completion_date = getFormattedDate(expectedCompletionDate!);
        project!.project_image_path = projectImage;

        const result = await updateProject(project!, image);
        setStartDate(toDateObject(project!.start_date));
        project!.start_date = getFormattedDate(startDate!);
        console.log("Project: ", result);
        project!.project_image_path = result.object
        setProjectImage(project!.project_image_path!);
        setIsLoading(false);
        if (result.status_code === 2000) {
            toast.current?.show({severity: 'success', summary: 'Success', detail: 'Project updated successfully'});
        } else {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to update project'});
        }

    }
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={projectImage} shape="square"/>
            <span className="font-bold white-space-nowrap">{projectName}</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenProjectEditDialog(false)} autoFocus/>
            <Button loading={isLoading} outlined label="Save" icon="pi pi-save" onClick={handleUpdateProject}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openProjectEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenProjectEditDialog(false)} style={{overflow: 'auto'}}>
                <div className="card flex justify-content-center" style={{margin: "10px"}}>
                    <Image src={projectImage} alt="Image" preview width="300"/>
                </div>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files![0];
                        setImage(file);
                    }}/>
                </div>


                <div className="card flex-column md:flex-row" style={{margin: '15px', width: '600px'}}>
                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="projectName">Project Name</label>
                        <InputText id="projectName" placeholder="Project Name" value={projectName} onChange={(e) => {
                            setProjectName(e.target.value)
                        }}/>
                    </div>


                    <div className="card flex justify-content-center gap-5" style={{margin: '15px', padding: '15px'}}>
                        <span className="p-float-label">
                            <InputTextarea id="summary" value={summary} onChange={(e) => {
                                setSummary(e.target.value)
                            }}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="summary">Project Summary</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center" style={{margin: '15px'}}>
                        <span className="p-float-label gap-5">
                            <InputTextarea id="description" value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="description">Project Description</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center gap-2" style={{margin: '15px', padding: '15px'}}>
                        <span className="p-float-label gap-5">
                            <InputTextarea id="aim" value={aim} onChange={(e) => {
                                setAim(e.target.value)
                            }}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="aim">Project Aim</label>
                        </span>
                    </div>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="projectAccessType">Project Access Type</label>
                            <Dropdown id="projectAccessType" value={projectStatus}
                                      onChange={(e: DropdownChangeEvent) => setProjectStatus(e.value)}
                                      options={projectStatusOptions} optionLabel="name"
                                      placeholder="Select a Project Status" className="w-full md:w-14rem"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="professionLevel">Project Professional Level</label>
                            <Dropdown id="professionLevel" value={projectProfessionalLevel}
                                      onChange={(e: DropdownChangeEvent) => setProjectProfessionalLevel(e.value)}
                                      options={projectProfessionalLevelOptions} optionLabel="name"
                                      placeholder="Select a Professional Level" className="w-full md:w-14rem"/>
                        </div>

                    </div>


                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="degree">Recommended Degree</label>
                            <Dropdown id="degree" value={recommendedDegree}
                                      onChange={(e: DropdownChangeEvent) => setRecommendedDegree(e.value)}
                                      options={degreeOptions} optionLabel="name"
                                      placeholder="Select a Degree" className="w-full md:w-14rem"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="projectLevel">Project Level</label>
                            <Dropdown id="projectLevel" value={projectLevel}
                                      onChange={(e: DropdownChangeEvent) => setProjectLevel(e.value)}
                                      options={projectLevelOptions} optionLabel="name"
                                      placeholder="Select a Project Level" className="w-full md:w-14rem"/>
                        </div>

                    </div>


                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="applicationDeadline">Application Date</label>
                            <Calendar id="applicationDeadline" dateFormat="dd/mm/yy" value={applicationDeadline}
                                      onChange={(e) => setApplicationDeadline(e.value)}
                                      showIcon/>
                        </div>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="expectedCompletionDate">Expected Completion Date</label>
                            <Calendar id="expectedCompletionDate" dateFormat="dd/mm/yy" value={expectedCompletionDate}
                                      onChange={(e) => setExpectedCompletionDate(e.value)}
                                      showIcon/>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="startDate">Start Date</label>
                            <Calendar id="startDate" dateFormat="dd/mm/yy" value={startDate}
                                      onChange={(e) => setStartDate(e.value)}
                                      showIcon/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="completionDate">Completion Date</label>
                            <Calendar id="completionDate" dateFormat="dd/mm/yy" value={completionDate}
                                      onChange={(e) => setCompletionDate(e.value)}
                                      showIcon/>
                        </div>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

export default ProjectUpdateComponent;
