import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	// SERVICE TO MANAGE JOB-LISTINGS FROM THE DATABASE.

	constructor(private http: HttpClient) {}

	private jobsUrl = 'http://localhost:3000/joblistings/findAll';

	// Method to fetch all joblistings from the database
	getJobs() {
		return this.http.get(this.jobsUrl);
	}
}
