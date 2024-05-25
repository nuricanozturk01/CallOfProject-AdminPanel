import {toDateObject} from "../util/Constants";

export class ProjectDTO {
    public project_id: string;
    public project_image_path: string;
    public project_name: string;
    public project_summary: string;
    public description: string;
    public project_aim: string;
    public project_access_type: string;
    public profession_level: string;
    public degree: string;
    public project_level: string;
    public start_date: string;
    public startDateObj: Date;
    public expected_completion_date: string;
    public expectedCompletionDateObj: Date;
    public application_deadline: string;
    public applicationDeadlineObj: Date;
    public completion_date: string;
    public completionDateObj: Date | null;
    public project_owner: string;
    public max_participants: number;
    public project_status: string;
    public current_participants: number;

    constructor(project_id: string, project_image_path: string, project_name: string, project_summary: string, description: string,
                project_aim: string, project_access_type: string, profession_level: string, degree: string, project_level: string,
                start_date: string, expected_completion_date: string, application_deadline: string, completion_date: string, project_owner: string, max_participants: number,
                project_status: string, current_participants: number) {

        this.max_participants = max_participants;
        this.project_owner = project_owner;
        this.project_id = project_id;
        this.project_image_path = project_image_path;
        this.project_name = project_name;
        this.project_summary = project_summary;
        this.description = description;
        this.project_aim = project_aim;
        this.project_access_type = project_access_type;
        this.profession_level = profession_level;
        this.degree = degree;
        this.project_level = project_level;
        this.start_date = start_date;
        this.expected_completion_date = expected_completion_date;
        this.application_deadline = application_deadline;
        this.completion_date = completion_date;
        this.project_status = project_status;
        this.current_participants = current_participants;
        this.startDateObj = toDateObject(start_date);
        this.expectedCompletionDateObj = toDateObject(expected_completion_date);
        this.applicationDeadlineObj = toDateObject(application_deadline);
        this.completionDateObj = this.completion_date !== null ? toDateObject(completion_date) : null;
    }
}