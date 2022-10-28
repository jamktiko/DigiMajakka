import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-attachments',
  templateUrl: './edit-attachments.component.html',
  styleUrls: ['./edit-attachments.component.css']
})
export class EditAttachmentsComponent implements OnInit {

  cv: string = '';
  portfolio: string = '';
  github: string = '';

  detailForm!: FormGroup;


  constructor() { }

  onSubmit(formdata:any) {

  }

  changeVisibility() {
  }

  ngOnInit(): void {
    this.detailForm = new FormGroup({
      // Email is a required field, it must be atleast 4 characters long and can be 45 characters long at maximum
      cv: new FormControl(this.cv, [
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      portfolio: new FormControl(this.portfolio, [
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      github: new FormControl(this.github, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
    })
  }

}
