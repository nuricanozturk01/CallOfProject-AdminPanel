import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import axios from "axios";
import {PREFIX} from "../util/ConnectionUtil";
import {ProjectDTO} from "../dto/ProjectDTO";


export const findAllProjectCount = async () => {
    try {
        const ALL_USER_COUNT_URL = `${PREFIX}/api/project/admin/total-project-count`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(ALL_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object
    } catch (error) {
        console.log(error)
    }
}

export const findAllProjectsByPage = async () => {
    try {
        const PROJECTS_URL = `${PREFIX}/api/project/admin/find/all`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(PROJECTS_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });

        return response.data.object.map((project: any) => {
            return new ProjectDTO(project.project_id, project.project_image_path, project.project_name, project.project_summary, project.description,
                project.project_aim, project.project_access_type, project.profession_level, project.degree, project.project_level,
                project.start_date, project.expected_completion_date, project.application_deadline, project.completion_date, project.project_owner,
                project.max_participants, project.project_status, project.current_participants)
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProject = async (dto: ProjectDTO, photo: File | null) => {
    try {
        const formData = new FormData();

        formData.append('dto', JSON.stringify(dto))

        if (photo) {
            formData.append('file', photo);
        }

        const UPDATE_URL = `${PREFIX}/api/project/admin/update`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(UPDATE_URL, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("Response: ", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
