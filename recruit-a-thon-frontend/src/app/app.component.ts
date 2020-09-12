import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'suitUp';
  displayHeader = false;
  displayFooter = false;
  displayBar = false;
  public baseURLH: any = ['/', '/home'];
  public baseURLF: any = ['/', '/home', '/register', '/login'];

  constructor(private router: Router, private appService: AppService) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.modifyDisplay(event.url);
    });
  }

  modifyDisplay(url): void {
    this.displayHeader = (this.baseURLH.indexOf(url) > -1) ? true : false;
    this.displayFooter = (this.baseURLF.indexOf(url) > -1) ? true : false;
    this.displayBar = (this.baseURLF.indexOf(url) > -1) ? false : true;
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }

  toggleSidebar(): void {
    this.appService.toggleSidebar();
  }

}
