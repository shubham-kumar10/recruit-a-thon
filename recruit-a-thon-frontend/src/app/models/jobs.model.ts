export interface Job {
    jobId: number;
    companyName: string;
    postedOn: string;
    description: string;
    location: string;
    pointOfContact: string;
    compensation: number;
    travelRequired: boolean;
    travelPercent: number;
    vacancies: number;
    position: string;
    process: Process;
    skillsRequired: JobRequirement[];
    minimumExperience: number;
    minimumEducation: string;
}

export interface Process {
    processId: number;
    description: string;
    location: string;
    duration: string;
    rounds: Rounds[];
}

export interface Rounds {
    roundId: number;
    location: string;
    duration: string;
    pointOfContact: string;
    description: string;
}

export interface JobRequirement {
    id: number;
    name: string;
    experience: number;
}
