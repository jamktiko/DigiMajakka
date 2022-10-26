import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileEditService } from '../profile-edit.service';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.css']
})
export class EditContactInfoComponent implements OnInit {

  // Declarations for the form-values
  email: string = '';
  phone: number = 0;
  linkedin: string = '';
  instagram: string = '';
  facebook: string = '';
  twitter: string = '';

  visible: boolean;
  

  // Declaration for FormGroup
  detailForm!: FormGroup;


  constructor(private editservice: ProfileEditService) {
    this.visible = editservice.contactEdit;
   }

   changeVisibility() {
    this.editservice.toggleVisibility();
    
  }



  ngOnInit(): void {
    // Validators placed inside ngOnInit()
    this.detailForm = new FormGroup({
      // Email is a required field, it must be atleast 4 characters long and can be 45 characters long at maximum
      email: new FormControl(this.email, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(45)
      ]),
      phone: new FormControl(this.phone, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      linkedin: new FormControl(this.linkedin, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
      instagram: new FormControl(this.instagram, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
      facebook: new FormControl(this.facebook, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
      twitter: new FormControl(this.twitter, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
    })
  }

}
