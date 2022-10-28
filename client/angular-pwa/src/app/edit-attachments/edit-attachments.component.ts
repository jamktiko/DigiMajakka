import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-edit-attachments',
	templateUrl: './edit-attachments.component.html',
	styleUrls: ['./edit-attachments.component.css'],
})
export class EditAttachmentsComponent implements OnInit {
	info = {
		cv: '',
		portfolio: '',
		github: '',
	};

	detailForm!: FormGroup;

	constructor() {}

	onSubmit(formdata: any) {}

	changeVisibility() {}

	ngOnInit(): void {}
}
