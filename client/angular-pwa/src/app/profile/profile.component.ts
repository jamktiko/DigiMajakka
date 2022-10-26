import { Component, OnInit } from '@angular/core';
import { ProfileEditService } from '../profile-edit.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private editservice: ProfileEditService ) { }

  get isEditVisible(): boolean {
    return this.editservice.contactEdit;
  }

  changeVisibility() {
    this.editservice.toggleVisibility();
  }
  
  ngOnInit(): void {
  }

}
