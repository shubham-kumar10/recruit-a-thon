import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { CandidateService } from '../services/candidate.service';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient, private authService: AuthenticationService, private candidateService: CandidateService) { }
  applyUrl = environment.appRoot + 'apply';
  withdrawUrl = environment.appRoot + 'withdraw';
  saveUrl = environment.appRoot + 'save';

  applyJobs(canId: number, jobId: number): Observable<Candidate> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.applyUrl + '/' + canId + '/' + jobId;
    return this.http.post<Candidate>(url, { headers });
  }

  withdrawJobs(appId: number): Observable<Candidate> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.withdrawUrl + '/' + appId;
    return this.http.post<Candidate>(url, { headers });
  }

  saveJobs(canId: number, jobId: number): Observable<Candidate> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getUserDetails().token);
    const url: string = this.saveUrl + '/' + canId + '/' + jobId;
    return this.http.post<Candidate>(url, { headers });
  }
}
