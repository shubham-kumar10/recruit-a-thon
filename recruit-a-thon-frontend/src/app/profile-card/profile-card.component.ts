import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() profileDetails: Profile;

  constructor() { }

  ngOnInit(): void {
    this.profileDetails.profilePicture = this.profileDetails.profilePicture ?
      'data:image/jpeg;base64,' + this.profileDetails.profilePicture : undefined;
  }

}
