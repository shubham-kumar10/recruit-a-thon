import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/jobs.model';
import { CandidateService } from '../services/candidate.service';
import { Status } from '../constants/application.constants';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {
  constructor(private http: HttpClient, private candidateService: CandidateService) { }
  jobList: Job[];
  ngOnInit(): void {
    const list = this.candidateService.statusfilter(Status.SAVE);
    this.jobList = list.map(item => item.job);
  }

}
