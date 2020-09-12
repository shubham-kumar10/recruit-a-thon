import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  personalDetailsForm: FormGroup;
  educationDetailsForm: FormGroup;
  experienceDetailsForm: FormGroup;
  additionalDetailsForm: FormGroup;
  isOptional = true;
  isChecked = false;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  addCandidateDetails(): void {
    this.candidateService.addCandidateDetails(this.candidateService.getCandidateDetails()).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['jobs']);
      });
    this.authService.updateUserDetails(this.authService.getUserDetails()).subscribe();
  }

}
