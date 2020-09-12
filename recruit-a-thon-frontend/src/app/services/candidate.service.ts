import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Candidate, Education, Experience, Project, Skill } from '../models/candidate.model';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  private candidateDetails: Candidate;

  candidateUrl = environment.appRoot + 'profile';
  commonUrl = environment.appRoot + 'edit';
  educationUrl = 'education';
  experienceUrl = 'project';
  projectUrl = 'experience';
  skillUrl = 'skills';
  profilePicture: any;

  getCandidateDetails(): Candidate {
    return this.candidateDetails;
  }

  setCandidateDetails(candidateDetails: Candidate): void {
    this.candidateDetails = candidateDetails;
  }

  getCandidateProfile(): Observable<Candidate> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.candidateUrl + '/' + this.authService.getUserDetails().id;
    return this.http.get<Candidate>(url, { headers });
  }

  addCandidateDetails(candidateDetails: Candidate): Observable<Candidate> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.candidateUrl + '/' + this.authService.getUserDetails().id;
    return this.http.post<Candidate>(url, candidateDetails, { headers });
  }

  updateEducationDetails(EducationDetails: Education): Observable<Education> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.commonUrl + '/' + this.getCandidateDetails().id + '/' + this.educationUrl;
    return this.http.post<Education>(url, EducationDetails, { headers });
  }

  updateExperienceDetails(ExperienceDetails: Experience): Observable<Experience> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.commonUrl + '/' + this.getCandidateDetails().id + '/' + this.experienceUrl;
    return this.http.post<Experience>(url, ExperienceDetails, { headers });
  }

  updateProjectDetails(ProjectDetails: Project): Observable<Project> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.commonUrl + '/' + this.getCandidateDetails().id + '/' + this.projectUrl;
    return this.http.post<Project>(url, ProjectDetails, { headers });
  }

  updateSkillDetails(SkillDetails: Skill): Observable<Skill> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.commonUrl + '/' + this.getCandidateDetails().id + '/' + this.skillUrl;
    return this.http.post<Skill>(url, SkillDetails, { headers });
  }

  statusfilter(status: string) {
    const list = this.getCandidateDetails().applications.filter(item => item.status === status);
    return list;
  }

  uploadFile(file: FormData): Observable<any> {
    console.log(file);
    const url = this.candidateUrl + '/image/' + this.candidateDetails.id;
    return this.http.post<any>(url, file);
  }

  getProfilePicture(): string {
    const url = this.candidateUrl + '/image/' + this.candidateDetails.id;
    let retrieveResonse;
    this.http.get(url).subscribe(
      (response) => { retrieveResonse = 'data:image/jpeg;base64,' + response; });
    this.profilePicture = retrieveResonse;
    return retrieveResonse;
  }

  getAllCandidates(): Observable<Profile[]> {
    const url = this.candidateUrl + '/all';
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    return this.http.get<Profile[]>(url);
  }
}
