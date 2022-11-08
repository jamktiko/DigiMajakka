import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-edit-attachments',
	templateUrl: './edit-attachments.component.html',
	styleUrls: ['./edit-attachments.component.css'],
})
export class EditAttachmentsComponent implements OnInit {
	attachments = {
		cv: '',
		portfolio: '',
		github: '',
	};

	detailForm!: FormGroup;

	constructor(private editservice: StateManagementService) {}

	onSubmit(formdata: any) {}

	changeVisibility() {
		this.editservice.toggleAttachmentVisibility();
	}

	ngOnInit(): void {}
}
