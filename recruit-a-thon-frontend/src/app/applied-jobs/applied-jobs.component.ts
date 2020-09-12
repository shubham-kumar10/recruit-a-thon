import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/jobs.model';
import { CandidateService } from '../services/candidate.service';
import { Status } from '../constants/application.constants';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  constructor(private http: HttpClient, private candidateService: CandidateService) { }
  jobList: Job[];
  ngOnInit(): void {
    const list = this.candidateService.statusfilter(Status.APPLY);
    this.jobList = list.map(item => item.job);
  }

}
