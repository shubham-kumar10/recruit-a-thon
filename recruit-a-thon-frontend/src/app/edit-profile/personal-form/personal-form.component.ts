import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Candidate } from 'src/app/models/candidate.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoggedInUser } from 'src/app/models/user';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {

  @Input() personalDetailsForm: FormGroup;
  isOptional = true;
  isChecked = false;
  profileData1 = this.authService.getUserDetails();
  profileData2 = this.candidateService.getCandidateDetails();
  email = this.profileData1 ? this.profileData1.username : null;
  contact = this.profileData1 ? this.profileData1.contactnumber : null;
  dob = this.profileData2 ? this.profileData2.dateOfBirth : null;
  constructor(private fb: FormBuilder, private candidateService: CandidateService, private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.personalDetailsForm = this.fb.group({
      email: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      contact: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      summary: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.personalDetailsForm.patchValue({
      email: this.email,
      contact: this.contact,
      dob: this.dob,
      country: this.profileData2 ? this.profileData2.country : null,
      city: this.profileData2 ? this.profileData2.city : null,
      gender: this.profileData2 ? this.profileData2.gender : null,
      summary: this.profileData2 ? this.profileData2.bio : null,
      role: this.profileData1 ? this.profileData1.role : null,
    });
  }

  addCandidateDetails(): void {

    const candidateData: Candidate = {
      id: null,
      bio: this.personalDetailsForm.get('summary').value,
      city: this.personalDetailsForm.get('city').value,
      country: this.personalDetailsForm.get('country').value,
      dateOfBirth: this.personalDetailsForm.get('dob').value,
      gender: this.personalDetailsForm.get('gender').value,
      profilePicture: null,
      resume: null,
      education: [],
      project: [],
      experience: [],
      skills: [],
      applications: [],
    };

    const userData: LoggedInUser = this.authService.getUserDetails();
    userData.role = this.personalDetailsForm.get('role').value ? 'RECRUITER' : 'CANDIDATE';
    userData.contactnumber = this.personalDetailsForm.get('contact').value;
    userData.username = this.personalDetailsForm.get('email').value;

    this.candidateService.setCandidateDetails(candidateData);
    this.authService.updateUserDetails(userData);
  }
}
