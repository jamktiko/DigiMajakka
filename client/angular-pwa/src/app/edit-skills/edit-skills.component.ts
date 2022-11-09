import {Component, Input, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-edit-skills',
	templateUrl: './edit-skills.component.html',
	styleUrls: ['./edit-skills.component.css'],
})
export class EditSkillsComponent implements OnInit {
	constructor(private stateservice: StateManagementService) {}

	// Currently logged in users profile fetched from profile-component
	@Input() loggedProfile: any;

	// placeholder data until database-fetching is implemented
	skills: any = [
		{
			name: 'Angular',
		},
		{name: 'AWS'},
	];

	// The selected skill, and the array that will hold all selected skills until the form is submitted
	toBeAddedSkill: any;
	toBeAddedSkills: any = [];

	ngOnInit(): void {}

	// Method to push the selected skill into the array
	addSkill(formdata: any) {
		this.toBeAddedSkills.push(formdata.toBeAddedSkill);
		this.toBeAddedSkills = this.toBeAddedSkills;
		console.log(this.toBeAddedSkills);
	}

	// method to checnge the visibility of the form
	changeVisibility() {
		this.stateservice.toggleSkillVisibility();
	}

	// Functionality that happens when the form is submitted
	onSubmit(formadata: any) {}
}
