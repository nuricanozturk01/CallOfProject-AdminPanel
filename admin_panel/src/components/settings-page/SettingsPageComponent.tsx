import SidebarComponent from "../sidebar/SidebarComponent";
import React, {useRef} from "react";
import {Card} from "primereact/card";
import './Settings.css';
import {ConfirmPopup} from "primereact/confirmpopup";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";
import {Accordion, AccordionTab} from 'primereact/accordion';
import {
    startScheduleCheckExpiredCodingInterview,
    startScheduleCheckExpiredTestInterview,
    startScheduleCheckFeedbacks,
    startScheduleCheckFeedbackTimeout,
    startScheduleCheckProjectDeadlines,
    startScheduleCheckProjectStartDate,
    startScheduleCheckStartedCodingInterview,
    startScheduleCheckStartedTestInterview,
    startScheduleCloseExpiredTasks,
    startScheduleNotifyUsersForTask, startScheduleRecommendProjects,
    startScheduleRecommendUserByEducation,
    startScheduleRecommendUserByExperience,
    startScheduleRecommendUserByTags,
    startScheduleReminderCodingInterview,
    startScheduleReminderTestInterview
} from "../../services/SchedulerService";
import {showErrorMessage, showSuccessMessage} from "../../util/Notification";

const SettingsPageComponent = () => {

    const toast = useRef<Toast>(null);


    const handleStartTimeTestBtn = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckStartedTestInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleStartTimeCodingBtn = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckStartedCodingInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };


    const handleTestInterviewReminder = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleReminderTestInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Failed to schedule reminder")
        }
    };
    const handleCodingInterviewReminder = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleReminderCodingInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handTestInterviewExpired = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckExpiredTestInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Failed to schedule reminder")
        }
    };
    const handCodingInterviewExpired = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckExpiredCodingInterview())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleProjectDeadlineSchedule = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckProjectDeadlines())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleFeedbackTimeoutSchedule = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckFeedbackTimeout())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleScheduleFeedbacks = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckFeedbacks())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleScheduleProjectStartDate = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCheckProjectStartDate())
        } catch (e) {
            showErrorMessage(toast, "Error", "Schedule could not be started")
        }
    };
    const handleScheduleNotifyUsers = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleNotifyUsersForTask())
        } catch (e) {
            showErrorMessage(toast, "Error", "Notify users could not be scheduled")
        }
    };
    const handleScheduleExpiredTasks = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleCloseExpiredTasks())
        } catch (e) {
            showErrorMessage(toast, "Error", "Expired tasks could not be scheduled")
        }
    };
    const handleRecommendProjects = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleRecommendProjects())
        } catch (e) {
            showErrorMessage(toast, "Error", "Recommend projects could not be scheduled")
        }
    };


    const handleUserMatchingByTags = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleRecommendUserByTags())
        } catch (e) {
            showErrorMessage(toast, "Error", "Recommend users by tags could not be scheduled")
        }
    };
    const handleUserMatchingByEducation = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleRecommendUserByEducation())
        } catch (e) {
            showErrorMessage(toast, "Error", "Recommend users by education could not be scheduled")
        }
    };
    const handleUserMatchingByExperience = async () => {
        try {
            showSuccessMessage(toast, "Scheduled Started", await startScheduleRecommendUserByExperience())
        } catch (e) {
            showErrorMessage(toast, "Error", "Recommend users by experience could not be scheduled")
        }
    };
    return (
        <div className="card">
            <Toast ref={toast}/>
            <ConfirmPopup/>
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <Card title="Scheduler Settings" className="settings-container">
                <Accordion multiple activeIndex={[0]}>
                    <AccordionTab header="Interview Service">
                        <div className="flex flex-row justify-space-between gap-5">
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handleStartTimeTestBtn()} icon="pi pi-calendar-times"
                                    label="Start Time (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handleStartTimeCodingBtn()} icon="pi pi-calendar-times"
                                    label="Start Time (Coding)"></Button>
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handleTestInterviewReminder()} icon="pi pi-calendar-times"
                                    label="Reminder (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handleCodingInterviewReminder()} icon="pi pi-calendar-times"
                                    label="Reminder (Coding)"></Button>
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handTestInterviewExpired()} icon="pi pi-calendar-times"
                                    label="Expired (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => handCodingInterviewExpired()} icon="pi pi-calendar-times"
                                    label="Expired (Coding)"></Button>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Project Service">
                        <div className="flex flex-row justify-space-between gap-5">
                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => handleProjectDeadlineSchedule()} icon="pi pi-calendar-times"
                                    label="Schedule Project Deadline"></Button>

                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => handleFeedbackTimeoutSchedule()} icon="pi pi-calendar-times"
                                    label="Schedule Feedback Timeout"></Button>
                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => handleScheduleFeedbacks()} icon="pi pi-calendar-times"
                                    label="Schedule Feedbacks"></Button>

                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => handleScheduleProjectStartDate()} icon="pi pi-calendar-times"
                                    label="Schedule Project Start Date"></Button>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Task Service">
                        <div className="flex flex-row justify-space-between gap-5">
                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleScheduleNotifyUsers()} icon="pi pi-calendar-times"
                                    label="Schedule Notify User"></Button>

                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleScheduleExpiredTasks()} icon="pi pi-calendar-times"
                                    label="Schedule Expired Tasks"></Button>
                        </div>
                    </AccordionTab>


                    <AccordionTab header="Project Recommendation">
                        <div className="flex flex-row justify-space-between gap-5">
                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleRecommendProjects()} icon="pi pi-calendar-times"
                                    label="Recommend Projects"></Button>
                        </div>
                    </AccordionTab>


                    <AccordionTab header="User Recommendation">
                        <div className="flex flex-row justify-space-between gap-5">
                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleUserMatchingByTags()} icon="pi pi-calendar-times"
                                    label="Recommend User by Tags"></Button>

                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleUserMatchingByEducation()} icon="pi pi-calendar-times"
                                    label="Recommend User by Education"></Button>

                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => handleUserMatchingByExperience()} icon="pi pi-calendar-times"
                                    label="Recommend User by Experience"></Button>
                        </div>
                    </AccordionTab>


                </Accordion>
            </Card>
        </div>
    )
}

export default SettingsPageComponent;