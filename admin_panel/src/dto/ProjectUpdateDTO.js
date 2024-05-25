export class ProjectUpdateDTO {
    constructor(userId, projectId, projectImage, projectName, projectSummary, projectDescription, projectAim, applicationDeadline,
                expectedCompletionDate, maxParticipantCount, technicalRequirements, specialRequirements, projectAccessType,
                professionLevel, sector, degree, projectLevel, adminNote, interviewType, feedbackTimeRange, startDate, tags)
    {
        this.user_id = userId;
        this.project_id = projectId;
        this.project_image = projectImage;
        this.project_name = projectName;
        this.project_summary = projectSummary;
        this.project_description = projectDescription;
        this.project_aim = projectAim;
        this.project_deadline = applicationDeadline;
        this.expected_completion_date = expectedCompletionDate;
        this.max_participant_count = maxParticipantCount;
        this.technical_requirements = technicalRequirements;
        this.special_requirements = specialRequirements;
        this.project_access_type = projectAccessType;
        this.project_profession_level = professionLevel;
        this.project_sector = sector;
        this.project_degree = degree;
        this.project_level = projectLevel;
        this.admin_note = adminNote;
        this.project_interview_type = interviewType;
        this.feedback_time_range = feedbackTimeRange;
        this.start_date = startDate;
        this.tags = tags;
    }
}