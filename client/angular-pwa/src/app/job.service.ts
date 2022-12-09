import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	// SERVICE TO MANAGE JOB-LISTINGS FROM THE DATABASE.

	constructor(private http: HttpClient) {}

	private jobsUrl = 'http://localhost:3000/joblistings';

	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	// Method to fetch all joblistings from the database
	getJobs() {
		console.log(this.jobsUrl);
		return this.http.get(this.jobsUrl);
	}

	postJobAnnoucement(jobData: any) {
		return this.http.post(
			`http://localhost:3000/joblistings`,
			jobData,
			this.httpOptions
		);
	}

	deleteJobAnnoucement(advertid: any) {
		return this.http.delete(
			`http://localhost:3000/joblistings/${advertid}`,
			this.httpOptions
		);
	}

	jobById(id: string) {
		return this.http.get(
			`http://localhost:3000/joblistings/${id}`,
			this.httpOptions
		);
	}
}
