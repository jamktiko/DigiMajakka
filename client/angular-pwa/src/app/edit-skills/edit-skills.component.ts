import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
	@Output() updatedProfile = new EventEmitter();

	// Error variables that dictate if an error message is shown
	error: boolean = false;
	insertError: boolean = false;
	deleteError: boolean = false;

	// skillAdded tells if the user has added any new skills to the list. If not, the submit-button is disabled
	skillAdded: boolean = false;

	// placeholder data until database-fetching is implemented
	allSkills: any = [];

	// The selected skill, and the array that will hold all selected skills until the form is submitted
	toBeAddedSkill: string = 'Valitse taito';
	toBeAddedSkills: any = [];
	toBeDeletedSkills: any = [];

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

	// Method to push the selected skill into the array. If the skill is already in the list, doesn't add the skill and notifies the user
	addSkill(formdata: any) {
		console.log(formdata.skill);
		if (this.toBeAddedSkills.includes(formdata.skill)) {
			this.error = true;
		} else {
			this.toBeAddedSkills.push(formdata.skill);
			this.skillAdded = true;
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
			this.toBeDeletedSkills.push(skill);
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
		if (this.toBeAddedSkills.length > 0) {
			this.profileservice
				.insertNewProfileSkills(
					this.loggedProfile[0].userprofileid,
					'{"skills": ["' + skills.join('","') + '"]}'
				)
				.subscribe(
					() => {
						console.log(this.toBeDeletedSkills);
						// If there are skills that are to be deleted, call the remove-method. Otherwise complete update
						if (this.toBeDeletedSkills.length > 0) {
							this.profileservice
								.removeProfileSkills(
									this.loggedProfile[0].userprofileid,
									'{"skills": ["' +
										this.toBeDeletedSkills.join('","') +
										'"]}'
								)
								.subscribe(
									() => {
										this.changeVisibility();
										this.updatedProfile.emit();
									},
									(Error) => {
										this.deleteError = true;
									}
								);
						} else {
							this.changeVisibility();
							this.updatedProfile.emit();
						}
					},
					(Error) => {
						this.insertError = true;
					}
				);
		} else {
			this.profileservice
				.removeProfileSkills(
					this.loggedProfile[0].userprofileid,
					'{"skills": ["' + this.toBeDeletedSkills.join('","') + '"]}'
				)
				.subscribe(
					() => {
						this.changeVisibility();
						this.updatedProfile.emit();
					},
					(Error) => {
						this.deleteError = true;
					}
				);
		}
	}
}
