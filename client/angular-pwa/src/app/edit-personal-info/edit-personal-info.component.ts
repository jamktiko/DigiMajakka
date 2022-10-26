import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {

  // Declaration for form values
  firstname: string = '';
  lastname: string = '';
  field: string = '';
  school: string = '';
  city: string = '';

  // declaration for FormGroup
  detailForm!: FormGroup;





  constructor() { }

  // Valiadations for the form are inside ngOnInit()
  ngOnInit(): void {
    this.detailForm = new FormGroup({
      firstname: new FormControl(this.firstname, [
        // Firstname is a required field, must be atleast 2 characters long and cannot be longer than 45 characters
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      lastname: new FormControl(this.firstname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      field: new FormControl(this.firstname, [
        Validators.required,
      ]),
      school: new FormControl(this.school, [
        Validators.required,
      ]),
      city: new FormControl(this.city, [
        Validators.required,
      ])
      


    })
  }

  // Method that has the functionality for submitting the form
  onSubmit(formdata: any) {
    // ADD FUNCTIONALITY
  }

}
