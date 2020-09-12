import { Skill, Experience } from './candidate.model';

export interface Profile {
    city: string;
    country: string;
    profilePicture: any;
    skills: Skill[];
    experience: Experience[];
    id: number;
    firstName: string;
    lastName: string;
    contactNumber: number;
    userName: string;
}

export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    contactNumber: number;
    userName: string;
}
