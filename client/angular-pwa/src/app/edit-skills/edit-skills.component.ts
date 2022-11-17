import {Component, Input, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';

@Component({
	selector: 'app-edit-skills',
	templateUrl: './edit-skills.component.html',
	styleUrls: ['./edit-skills.component.css'],
})
export class EditSkillsComponent implements OnInit {
	constructor(
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	// Currently logged in users profile fetched from profile-component
	@Input() loggedProfile: any;
	@Input() profileSkills: any;

	// Error variable that dictates if an error message is shown
	error: boolean = false;

	// placeholder data until database-fetching is implemented
	allSkills: any = [];

	// The selected skill, and the array that will hold all selected skills until the form is submitted
	toBeAddedSkill: string = 'Valitse taito';
	toBeAddedSkills: any = [];

	selected: any = [];

	// getSkills() called when the component is created
	ngOnInit(): void {
		this.getSkills();
		this.profileSkills.forEach((skill: any) => {
			this.toBeAddedSkills.push(skill.name);
		});
	}

	// Method to get all skills by calling the getAllSkills()-method in profileservice
	getSkills() {
		this.profileservice.getAllSkills().subscribe((skills) => {
			this.allSkills = skills;
			console.log(this.allSkills);
		});
	}

	// Method to push the selected skill into the array
	addSkill(formdata: any) {
		console.log(formdata.skill);
		if (this.toBeAddedSkills.includes(formdata.skill)) {
			this.error = true;
		} else {
			this.toBeAddedSkills.push(formdata.skill);
			this.error = false;
			console.log(this.toBeAddedSkills);
		}
	}

	// Method that add the clicked skill to selected skills
	selectSkill(skill: string) {
		if (this.selected.includes(skill)) {
			this.selected.splice(this.selected.indexOf(skill), 1);
			console.log(this.selected);
		} else {
			this.selected.push(skill);
			console.log(this.selected);
		}
	}

	removeSelected() {
		this.selected.forEach((skill: string) => {
			this.toBeAddedSkills.splice(this.toBeAddedSkills.indexOf(skill), 1);
		});
		this.selected = [];
		console.log(this.toBeAddedSkills);
	}

	// method to change the visibility of the form
	changeVisibility() {
		this.stateservice.toggleSkillVisibility();
	}

	// Functionality that happens when the form is submitted
	onSubmit(skills: any) {
		this.profileservice.insertNewProfileSkills(
			this.loggedProfile[0].userprofileid,
			`{"skills": "${skills}"}`
		);
	}
}
