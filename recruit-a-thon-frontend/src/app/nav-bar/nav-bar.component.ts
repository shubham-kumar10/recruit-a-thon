import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AuthenticationService } from '../services/authentication.service';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private appService: AppService,
    private authService: AuthenticationService,
    private candidateService: CandidateService,
    private router: Router
  ) { }
  isCollapsed = true;
  ngOnInit(): void {
  }

  toggleSidebarPin(): void {
    this.appService.toggleSidebarPin();
  }

  toggleSidebar(): void {
    this.appService.toggleSidebar();
  }

  public logout(): void {
    this.authService.setUserDetails(null);
    this.candidateService.setCandidateDetails(null);
    this.router.navigate(['login']);
  }

  goToSearch(): void {
    this.router.navigate(['search']);
  }
}
