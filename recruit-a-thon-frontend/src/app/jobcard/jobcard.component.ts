import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../models/jobs.model';
import { ApplicationService } from '../services/application.service';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../models/candidate.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent implements OnInit {
  private candidateDetails: Candidate;
  @Input() jobDetails: Job;
  constructor(private http: HttpClient, private candidateService: CandidateService,
    public applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.candidateDetails = this.candidateService.getCandidateDetails();
  }

  applyforjob() {
    this.applicationService.applyJobs(this.candidateDetails.id, this.jobDetails.jobId).subscribe(
      (response) => {
        this.candidateService.setCandidateDetails(response);
      });

  }

  /*  withdrawfromjob(){
      this.applicationService.withdrawJobs(this.candidateDetails.id  ).subscribe(
        (response) => {
        });
    } */

  savejob() {
    this.applicationService.saveJobs(this.candidateDetails.id, this.jobDetails.jobId).subscribe(
      (response) => {
        this.candidateService.setCandidateDetails(response);
      });

  }

}
