import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoggedInUser } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private authenticationApiUrl: string = environment.appRoot + 'authenticate';
    private userDetails: LoggedInUser;

    constructor(private httpClient: HttpClient, public router: Router) { }

    public getUserDetails() {
        return this.userDetails;
    }

    public setUserDetails(userDetails: LoggedInUser) {
        this.userDetails = userDetails;
    }

    updateUserDetails(userData: LoggedInUser): Observable<boolean> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.getUserDetails().token);
        const url: string = environment.appRoot + 'user';
        return this.httpClient.put<boolean>(url, userData, { headers });
    }

    authenticate(user: string, password: string): Observable<LoggedInUser> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
        return this.httpClient.get<LoggedInUser>(this.authenticationApiUrl, { headers });
    }

    public isLoggedIn(): boolean {
        if (this.getUserDetails()) {
            return true;
        }
        return false;
    }
}
