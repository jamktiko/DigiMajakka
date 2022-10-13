import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profilecarousel',
  templateUrl: './profilecarousel.component.html',
  styleUrls: ['./profilecarousel.component.css']
})
export class ProfilecarouselComponent implements OnInit {

  constructor(private profileService: ProfilesService) { }

  profiles: any = [];

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => this.profiles = profiles)
  }

}
