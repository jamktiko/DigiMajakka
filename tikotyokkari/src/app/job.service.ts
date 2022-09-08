import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  private jobUrl = 'api/scores'



  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.jobUrl);
  }
}
