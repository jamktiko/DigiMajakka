import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  private profileUrl = 'http://localhost:3000/profiles/findAll';

  getProfiles() {
    return this.http.get(this.profileUrl);
  }
}
