import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Profile} from './profile';
import {LoginService} from './login.service';

@Injectable({
	providedIn: 'root',
})
export class ProfilesService {
	constructor(private http: HttpClient, private loginservice: LoginService) {}

	loggedUser: any = 'orja@gmail.com';
	private findAllUrl = 'http://localhost:3000/profiles/findAll';
	private findByEmail = 'http://localhost:3000/profiles/findByEmail';
	private findProfileSkills = 'http://localhost:3000/profiles/skills';

	getProfiles() {
		return this.http.get(this.findAllUrl);
	}

	getProfileSkills(id: number) {
		return this.http.get(
			'http://localhost:3000/profiles/skills/3',
			this.httpOptions
		);
	}

	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	// Method that requests the currently logged in users profile
	getLoggedInProfile(): Observable<Profile[]> {
		const body = {email: this.loggedUser};
		return this.http
			.post(this.findByEmail, JSON.stringify(body), this.httpOptions)
			.pipe(map((response: any) => response));
	}

	/*
	

	
	// Error handler
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	// Method to update a profile using Http put-method.
	updateProfile(profile: any): Observable<any> {
		return this.http
			.put(
				'http://localhost:3000/profiles/updateProfile',
				profile,
				this.httpOptions
			)
			.pipe(catchError(this.handleError<any>('updateProfile')));
	}
  */
}
