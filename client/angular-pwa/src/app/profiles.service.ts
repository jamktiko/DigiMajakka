import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Profile} from './profile';
import {LoginService} from './login.service';

@Injectable({
	providedIn: 'root',
})
export class ProfilesService {
	constructor(private http: HttpClient, private loginservice: LoginService) {}

	loggedUser: any = 'orja@gmail.com';
	private findAllUrl = 'http://localhost:3000/profiles/';
	private findByEmail = 'http://localhost:3000/profiles/email/';
	private findProfileSkills = 'http://localhost:3000/profiles/skills';

	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	getProfiles() {
		return this.http.get(this.findAllUrl).pipe(
			catchError((error) => {
				console.log('Error: ' + error);
				return throwError(error);
			})
		);
	}

	// Method that requests the currently logged in users profile
	getLoggedInProfile(): Observable<Profile[]> {
		const body = {email: this.loggedUser};
		return this.http
			.post(this.findByEmail, JSON.stringify(body), this.httpOptions)
			.pipe(map((response: any) => response));
	}

	getAllSkills() {
		return this.http.get(`http://localhost:3000/skills`);
	}

	getProfileSkills(id: number) {
		return this.http.get(
			`http://localhost:3000/skills/profile/${id}`,
			this.httpOptions
		);
	}

	getProfileSomeLinks(id: number) {
		return this.http.get(
			`http://localhost:3000/links/${id}`,
			this.httpOptions
		);
	}

	getCities() {
		return this.http.get('http://localhost:3000/cities');
	}

	getSchools() {
		return this.http.get('http://localhost:3000/schools');
	}

	// getProfileCity(name: string) {
	// 	return this.http.get(`http://localhost:3000/cities/findByName/${name}`);
	// }

	// getProfileSchool(name: string) {
	// 	return this.http.get(
	// 		`http://localhost:3000/schools/findByName/${name}`
	// 	);
	// }

	// Method to update a profile using Http put-method.
	updateProfile(id: number, profile: any) {
		return this.http
			.put<any>(
				`http://localhost:3000/profiles/${id}`,
				profile,
				this.httpOptions
			)
			.subscribe((response) => console.log(response));
	}

	// Method to update links(social media etc.) of a profile
	updateProfileLinks(id: number, links: any) {
		return this.http
			.put(`http://localhost:3000/links/${id}`, links, this.httpOptions)
			.subscribe((response) => console.log(response));
	}
}
