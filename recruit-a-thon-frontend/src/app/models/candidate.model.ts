import { Job } from './jobs.model';

export interface Candidate {
    id: number;
    dateOfBirth: Date;
    gender: string;
    bio: string;
    country: string;
    city: string;
    profilePicture: any;
    resume: any;
    education: Education[];
    project: Project[];
    experience: Experience[];
    skills: Skill[];
    applications: Application[];
}

export interface Education {
    id: number;
    institution: string;
    startDate: Date;
    endDate: Date;
    degree: string;
    description: string;
    percentage: string;
}

export interface Experience {
    id: number;
    organization: string;
    startDate: Date;
    endDate: Date;
    designation: string;
    type: string;
    location: string;
    current: boolean;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    ongoing: boolean;
}

export interface Skill {
    id: number;
    skillName: string;
    rating: number;
}

export interface Application {
    applicationId: number;
    appliedOn: Date;
    status: string;
    isComplete: boolean;
    skillMatch: number;
    percentile: number;
    job: Job;
}
