import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProfilesService {
	constructor(private http: HttpClient) {}

	private findAllUrl = 'http://localhost:3000/profiles/findAll';
	private findByEmail = 'http://localhost:3000/profiles/findByEmail';

	getProfiles() {
		return this.http.get(this.findAllUrl);
	}

	getLoggedInProfile() {
		return this.http.get(this.findByEmail);
	}

	/*
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	
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
