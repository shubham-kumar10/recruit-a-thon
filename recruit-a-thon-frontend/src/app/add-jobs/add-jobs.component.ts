import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Candidate } from 'src/app/models/candidate.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Job, Process } from '../models/jobs.model';
import { JobService } from '../services/job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
  jobDetailsForm: FormGroup;
  indeterminate = false;
  processData: Process;
  constructor(private fb: FormBuilder, private candidateService: CandidateService,
    public jobService: JobService, private authService: AuthenticationService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.jobDetailsForm = this.fb.group({
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      pointOfContact: ['', Validators.required],
      compensation: ['', Validators.required],
      vacancies: ['', Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required],
      minimumEducation: ['', Validators.required],
      minimumExperience: ['', Validators.required],

      finaldescription: ['', Validators.required],
      finallocation: ['', Validators.required],
      duration: ['', Validators.required],

      travelRequired: ['', Validators.required],
      travelPercent: ['', Validators.required],
      rounds: this.fb.array([this.createRoundFormGroup()]),
      skillsRequired: this.fb.array([this.createSkillFormGroup()]),
    });

  }

  public addRoundFormGroup() {
    const rounds = this.jobDetailsForm.get('rounds') as FormArray;
    rounds.push(this.createRoundFormGroup());
  }

  public removeOrClearRound(i: number) {
    const rounds = this.jobDetailsForm.get('rounds') as FormArray;
    if (rounds.length > 1) {
      rounds.removeAt(i);
    } else {
      rounds.reset();
    }
  }

  private createRoundFormGroup(): FormGroup {
    return new FormGroup({
      location: new FormControl(''),
      duration: new FormControl(''),
      pointOfContact: new FormControl(''),
      description: new FormControl(''),
    });
  }

  public addSkillFormGroup() {
    const skillsRequired = this.jobDetailsForm.get('skillsRequired') as FormArray;
    skillsRequired.push(this.createSkillFormGroup());
  }

  public removeOrClearSkill(i: number) {
    const skillsRequired = this.jobDetailsForm.get('skillsRequired') as FormArray;
    if (skillsRequired.length > 1) {
      skillsRequired.removeAt(i);
    } else {
      skillsRequired.reset();
    }
  }

  private createSkillFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      experience: new FormControl(''),
    });
  }

  postJob() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(new Date(), 'DD-MMM-YYYY HH:mm:ss');
    if (this.jobDetailsForm.dirty) {

      this.processData = {
        processId: null,
        description: this.jobDetailsForm.get('finaldescription').value,
        location: this.jobDetailsForm.get('finallocation').value,
        duration: this.jobDetailsForm.get('duration').value,
        rounds: this.jobDetailsForm.value.rounds,
      };
      const jobData: Job = {
        jobId: null,
        postedOn: this.datePipe.transform(new Date(), 'yyy-MM-dd HH:mm:ss.SSS'),
        companyName: this.jobDetailsForm.get('companyName').value,
        description: this.jobDetailsForm.get('description').value,
        location: this.jobDetailsForm.get('location').value,
        pointOfContact: this.jobDetailsForm.get('pointOfContact').value,
        compensation: this.jobDetailsForm.get('compensation').value,
        travelRequired: this.jobDetailsForm.get('travelRequired').value,
        travelPercent: this.jobDetailsForm.get('travelPercent').value,
        vacancies: this.jobDetailsForm.get('vacancies').value,
        position: this.jobDetailsForm.get('position').value,
        minimumExperience: this.jobDetailsForm.get('minimumExperience').value,
        minimumEducation: this.jobDetailsForm.get('minimumEducation').value,
        skillsRequired: this.jobDetailsForm.value.skillsRequired,
        process: this.processData,
      };

      console.log('Formdata>>>', jobData);
      this.jobService.addJob(jobData).subscribe((response) => {
        console.log('Responsedata>>>', response);
      });
      // this.data = this.candidateService.getCandidateDetails();
      // this.data.education = this.educationDetailsForm.value.educations;
      // this.candidateService.setCandidateDetails(this.data);
    }
  }

}
