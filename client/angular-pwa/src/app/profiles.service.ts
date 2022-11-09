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

	getProfileSkills(id: number) {
		return this.http.get(
			`http://localhost:3000/profiles/skills/${id}`,
			this.httpOptions
		);
	}

	getProfileSomeLinks(id: number) {
		return this.http.get(
			`http://localhost:3000/somelinks/${id}`,
			this.httpOptions
		);
	}

	getProfileCity(name: string) {
		return this.http.get(`http://localhost:3000/cities/findByName/${name}`);
	}

	getProfileSchool(name: string) {
		return this.http.get(
			`http://localhost:3000/schools/findByName/${name}`
		);
	}

	// Method to update a profile using Http put-method.
	updateProfile(id: number, profile: any) {
		const body = profile;
		return this.http
			.put<any>(
				`http://localhost:3000/profiles/update/${id}`,
				body,
				this.httpOptions
			)
			.subscribe((response) => console.log(response));
	}
}
