import {PREFIX} from "../util/ConnectionUtil";
import axios from "axios";

export const startScheduleCheckStartedTestInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/test/check/started`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleCheckStartedCodingInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/coding/check/started`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleCheckExpiredTestInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/test/check/expired`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleCheckExpiredCodingInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/coding/check/expired`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleReminderTestInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/test/reminder`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleReminderCodingInterview = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/interview/coding/reminder`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleNotifyUsersForTask = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/task/notify`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleCloseExpiredTasks = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/task/check/expired`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleCheckFeedbackTimeout = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/project/check/feedback-timeout`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleCheckProjectDeadlines = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/project/check/deadline`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleCheckFeedbacks = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/project/check/feedback`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const startScheduleCheckProjectStartDate = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/project/check/start-date`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleRecommendProjects = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/recommendation/projects/by-tags`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleRecommendUserByTags = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/match/users/by-tags`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleRecommendUserByEducation = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/match/users/by-education`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const startScheduleRecommendUserByExperience = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/scheduler/match/users/by-experience`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data
    } catch (error) {
        console.log(error)
    }
}





