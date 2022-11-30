import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {LoginService} from '../login.service';

@Component({
	selector: 'app-user-notification',
	templateUrl: './user-notification.component.html',
	styleUrls: ['./user-notification.component.css'],
})
export class UserNotificationComponent implements OnInit {
	@Output() register = new EventEmitter();
	@Output() confirm = new EventEmitter();
	@Output() resetUserNotification = new EventEmitter();

	@Input() accountNotFound!: boolean;
	@Input() accountNotConfirmed!: boolean;
	@Input() accountAlreadyExists!: boolean;
	@Input() email!: string;

	constructor(
		private stateservice: StateManagementService,
		private loginservice: LoginService
	) {}

	ngOnInit(): void {}

	showConfirmForm() {
		this.confirm.emit();
	}

	changeVisibility() {
		this.stateservice.toggleUserNotificationVisibility();
		this.resetUserNotification.emit();
	}

	resendCode() {
		this.loginservice.resendConfirmationCode(this.email);
		console.log(this.email);
	}
}
