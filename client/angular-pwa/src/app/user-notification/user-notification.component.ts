import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {LoginService} from '../login.service';

@Component({
	selector: 'app-user-notification',
	templateUrl: './user-notification.component.html',
	styleUrls: ['./user-notification.component.css'],
})
export class UserNotificationComponent implements OnInit {
	// Declarations for eventemitters
	@Output() register = new EventEmitter();
	@Output() confirm = new EventEmitter();
	@Output() createProfile = new EventEmitter();
	@Output() resetUserNotification = new EventEmitter();

	// Variables that dictates which notification content is shown. They are received from the parent component.
	@Input() accountNotFound!: boolean;
	@Input() accountNotConfirmed!: boolean;
	@Input() accountAlreadyExists!: boolean;
	@Input() profileNotFound!: boolean;

	// Email is received from the parent component so the confirmation code goes to the right email.
	@Input() email!: string;

	constructor(
		private stateservice: StateManagementService,
		private loginservice: LoginService
	) {}

	ngOnInit(): void {}

	// Method that emits and event to redirect to the confirm account -form
	showConfirmForm() {
		this.confirm.emit();
	}

	// Method to change the visibility of the notification. Will also emit an event that is used to reset the notification.
	changeVisibility() {
		this.stateservice.toggleUserNotificationVisibility();
		this.resetUserNotification.emit();
	}

	// Method to send a new confirmation code for the user
	resendCode() {
		this.loginservice.resendConfirmationCode(this.email);
		console.log(this.email);
	}
}
