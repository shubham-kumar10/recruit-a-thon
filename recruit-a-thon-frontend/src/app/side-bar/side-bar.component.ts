import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CandidateService } from '../services/candidate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public candidateService: CandidateService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  firstname: string;
  lastname: string;
  headLine: string;
  ngOnInit(): void {
    this.detailsInit();
  }

  changePicture(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(UploadFileComponent, dialogConfig);
  }

  detailsInit(): void {
    if (this.authService.getUserDetails()) {
      this.firstname = this.authService.getUserDetails().firstname;
      this.lastname = this.authService.getUserDetails().lastname;
    }
    this.candidateService.getCandidateProfile().subscribe(
      (response) => {
        this.headLine = response.experience[0].designation;
        this.candidateService.setCandidateDetails(response);
      },
      (error) => {
        if (error.error.code === 'CANDIDATE_DOES_NOT_EXIST') {
          this.router.navigate(['editprofile']);
        }
      });
    this.headLine = !this.headLine ? this.authService.getUserDetails().role : undefined;
  }

}
