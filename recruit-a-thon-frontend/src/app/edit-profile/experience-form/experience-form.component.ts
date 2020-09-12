import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Candidate, Experience } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  @Input() experienceDetailsForm: FormGroup;
  data: Candidate;
  constructor(private fb: FormBuilder, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.experienceDetailsForm = this.fb.group({
      experiences: this.fb.array([this.createExperienceFormGroup()]),
    });
  }

  public addExperienceFormGroup() {
    const experiences = this.experienceDetailsForm.get('experiences') as FormArray;
    experiences.push(this.createExperienceFormGroup());
  }

  public removeOrClearExperience(i: number) {
    const experiences = this.experienceDetailsForm.get('experiences') as FormArray;
    if (experiences.length > 1) {
      experiences.removeAt(i);
    } else {
      experiences.reset();
    }
  }

  private createExperienceFormGroup(): FormGroup {
    return new FormGroup({
      designation: new FormControl(''),
      type: new FormControl(''),
      location: new FormControl(''),
      organization: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      current: new FormControl(''),
    });
  }

  addExperienceDetails() {
    if (this.experienceDetailsForm.dirty) {
      this.data = this.candidateService.getCandidateDetails();
      this.data.experience = this.experienceDetailsForm.value.experiences;
      this.candidateService.setCandidateDetails(this.data);
    }
  }
}
