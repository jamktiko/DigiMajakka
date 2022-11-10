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

	// Placeholder uservalue until authentication is implemented
	loggedUser: any = 'orja@gmail.com';
	private findAllUrl = 'http://localhost:3000/profiles/';
	private findByEmail = 'http://localhost:3000/profiles/email/';
	private findProfileSkills = 'http://localhost:3000/profiles/skills';

	// Options for http-requests
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	// Method to get all profiles form the database
	// CONTINUE THE ERRORHANDLING
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

	// Method for getting all skills from the database
	getAllSkills() {
		return this.http.get(`http://localhost:3000/skills`);
	}

	// Method to get skills of a specific profile from the database
	getProfileSkills(profileid: number) {
		return this.http.get(
			`http://localhost:3000/skills/profile/${profileid}`,
			this.httpOptions
		);
	}

	// Method to insert a new skill to a profile and in to the database
	// NOT IMPLEMENTED YET, BODY MISSING ETC
	insertNewProfileSkill(profileid: number, skill: string) {
		return this.http.post(
			`http://localhost:3000/skills/profile/${profileid}/${skill}`,
			this.httpOptions
		);
	}

	// Method to get links (social media, cv etc.) of a specific profile from the database
	getProfileLinks(profileid: number) {
		return this.http.get(
			`http://localhost:3000/links/${profileid}`,
			this.httpOptions
		);
	}

	// Method to update links(social media etc.) of a profile. Updated links are sent in the body
	updateProfileLinks(id: number, links: any) {
		return this.http
			.put(`http://localhost:3000/links/${id}`, links, this.httpOptions)
			.subscribe((response) => console.log(response));
	}

	// Method to get all cities from the database
	getCities() {
		return this.http.get('http://localhost:3000/cities');
	}

	// Method to get all schools from the database
	getSchools() {
		return this.http.get('http://localhost:3000/schools');
	}

	// Method to update a profile using Http put-method. Updated fields are sent in the body.
	updateProfile(profileid: number, profile: any) {
		return this.http
			.put<any>(
				`http://localhost:3000/profiles/${profileid}`,
				profile,
				this.httpOptions
			)
			.subscribe((response) => console.log(response));
	}
}
