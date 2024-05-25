import {toDateObject} from "../util/Constants";

export class User {
    birth_date: Date;
    creation_date: Date;
    deleted_at: boolean
    email: string;
    first_name: string;
    is_account_blocked: boolean;
    last_name: string;
    middle_name: string;
    user_id: string;
    username: string;
    roles: Role[];
    full_name: string;
    creationDateStr: string;
    birthDateStr: string;

    public constructor(birth_date: string, creation_date: string, deleted_at: any, email: string, first_name: string,
                       is_account_blocked: boolean, last_name: string, middle_name: string, user_id: string, username: string, roles: Role[]) {
        this.birth_date = toDateObject(birth_date);
        this.creation_date = toDateObject(creation_date);
        this.deleted_at = this.deleted_at = deleted_at !== null;
        this.email = email;
        this.first_name = first_name;
        this.is_account_blocked = is_account_blocked;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.user_id = user_id;
        this.username = username;
        this.roles = roles;
        this.full_name = `${first_name} ${middle_name} ${last_name}`
        this.creationDateStr = creation_date;
        this.birthDateStr = birth_date;
    }
}

export class Role {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}


export class UserProfile {
    public cv: string
    public profile_photo: string
    public about_me: any
    public user_rate: number
    public user_feedback_rate: number


    constructor(cv: string, profile_photo: string, about_me: any, user_rate: number, user_feedback_rate: number) {
        this.cv = cv;
        this.profile_photo = profile_photo;
        this.about_me = about_me;
        this.user_rate = user_rate;
        this.user_feedback_rate = user_feedback_rate;
    }
}

export interface Course {
    course_id: string
    organization: string
    course_name: string
    start_date: string
    finish_date: string
    is_continue: boolean
    description: string
}

export interface Education {
    education_id: string
    school_name: string
    department: string
    description: string
    start_date: string
    finish_date: string
    is_continue: boolean
    gpa: number
}

export interface Experience {
    experience_id: string
    company_name: string
    company_website_link: string
    start_date: string
    finish_date: string
    is_continue: boolean
    description: string
    position: string
}

export interface Link {
    link_title: string
    linkId: number
    link: string
}

export class UserProfileUpdateDTO {
    public user_rate: number
    public user_feedback_rate: number
    public about_me: string
    public user_id: string

    constructor(about_me: string, user_id: string, user_rate: number, user_feedback_rate: number) {
        this.about_me = about_me;
        this.user_id = user_id;
        this.user_rate = user_rate;
        this.user_feedback_rate = user_feedback_rate;
    }
}

export class TicketDTO {
    public id: string
    public user_id: string
    public admin_id: string
    public admin_username: string
    public username: string
    public user_email: string
    public title: string
    public feedback_deadline: string
    public answered_date: string
    public created_date: string
    public status: string
    public description: string

    constructor(id: string, user_id: string, admin_id: string, admin_username: string, username: string, user_email: string, title: string, feedback_deadline: string, answered_date: string, created_date: string, status: string,
                description: string) {

        this.description = description;
        this.id = id;
        this.user_id = user_id;
        this.admin_id = admin_id;
        this.admin_username = admin_username;
        this.username = username;
        this.user_email = user_email;
        this.title = title;
        this.feedback_deadline = feedback_deadline;
        this.answered_date = answered_date;
        this.created_date = created_date;
        this.status = status;
    }
}


export class TicketAnswerDTO {
    public id: string
    public admin_id: string
    public answer: string
    public admin_username: string

    constructor(id: string, admin_id: string, answer: string, admin_username: string) {
        this.id = id;
        this.admin_id = admin_id;
        this.answer = answer;
        this.admin_username = admin_username;
    }
}