import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input() projectDetailsForm: FormGroup;
  data: Candidate;
  constructor(private fb: FormBuilder, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.projectDetailsForm = this.fb.group({
      project: this.fb.array([this.createProjectFormGroup()]),
      skills: this.fb.array([this.createSkillFormGroup()])
    });
  }

  public addSkillFormGroup() {
    const skills = this.projectDetailsForm.get('skills') as FormArray;
    skills.push(this.createSkillFormGroup());
  }

  public removeOrClearSkill(i: number) {
    const skills = this.projectDetailsForm.get('skills') as FormArray;
    if (skills.length > 1) {
      skills.removeAt(i);
    } else {
      skills.reset();
    }
  }

  private createSkillFormGroup(): FormGroup {
    return new FormGroup({
      skillName: new FormControl(''),
      rating: new FormControl(''),
    });
  }

  public addProjectFormGroup() {
    const project = this.projectDetailsForm.get('project') as FormArray;
    project.push(this.createProjectFormGroup());
  }

  public removeOrClearProject(i: number) {
    const project = this.projectDetailsForm.get('project') as FormArray;
    if (project.length > 1) {
      project.removeAt(i);
    } else {
      project.reset();
    }
  }

  private createProjectFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl(''),
      ongoing: new FormControl(''),
    });
  }

  addProjectDetails() {
    if (this.projectDetailsForm.dirty) {
      this.data = this.candidateService.getCandidateDetails();
      this.data.project = this.projectDetailsForm.value.project;
      this.data.skills = this.projectDetailsForm.value.skills;
      this.candidateService.setCandidateDetails(this.data);
    }
  }

}
