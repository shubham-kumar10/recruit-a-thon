import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/jobs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  readonly endpoint = 'jobs';
  jobUrl: string = environment.appRoot + this.endpoint;

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(this.jobUrl + id);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobUrl, job);
  }
}
