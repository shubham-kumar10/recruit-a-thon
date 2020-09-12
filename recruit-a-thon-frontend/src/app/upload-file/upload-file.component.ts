import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {


  constructor (private candidateService: CandidateService, public dialogRef: MatDialogRef<UploadFileComponent>) { }
  selectedFile: File;
  picture: any;
  ngOnInit(): void {

  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile);
    this.candidateService.uploadFile(uploadData).subscribe(
      response => {
        console.log(response);
        this.candidateService.profilePicture = 'data:image/jpeg;base64,' + response.profilePicture;
        this.picture = this.candidateService.profilePicture;
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
