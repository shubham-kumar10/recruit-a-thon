import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../services/job.service';
import { Job } from '../models/jobs.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  constructor(private http: HttpClient, public jobService: JobService) { }

  jobList: Job[];

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((response) => {
      this.jobList = response;
      console.log(response);
    });
  }
}
