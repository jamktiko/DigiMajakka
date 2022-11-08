import {Component, Input, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-edit-skills',
	templateUrl: './edit-skills.component.html',
	styleUrls: ['./edit-skills.component.css'],
})
export class EditSkillsComponent implements OnInit {
	constructor(private stateservice: StateManagementService) {}

	@Input() loggedProfile: any;

	// placeholder data until database-fetching is implemented
	skills: any = [
		{
			name: 'Angular',
		},
		{name: 'AWS'},
	];

	toBeAddedSkill: any;
	toBeAddedSkills: any = [];

	ngOnInit(): void {}

	addSkill(formdata: any) {
		this.toBeAddedSkills.push(formdata.toBeAddedSkill);
		this.toBeAddedSkills = this.toBeAddedSkills;
		console.log(this.toBeAddedSkills);
	}

	changeVisibility() {
		this.stateservice.toggleSkillVisibility();
	}

	onSubmit(formadata: any) {}
}
