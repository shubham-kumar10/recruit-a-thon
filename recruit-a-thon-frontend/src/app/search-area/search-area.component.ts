import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { AuthenticationService } from '../services/authentication.service';
import { Candidate } from '../models/candidate.model';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss'],
})
export class SearchAreaComponent implements OnInit {
  profiles: Profile[];
  constructor(
    private candidateService: CandidateService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.candidateService.getAllCandidates().subscribe(
      (response) => {
        this.profiles = response;
      });
  }
}
