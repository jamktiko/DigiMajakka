import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-user-notification',
	templateUrl: './user-notification.component.html',
	styleUrls: ['./user-notification.component.css'],
})
export class UserNotificationComponent implements OnInit {
	@Output() register = new EventEmitter();
	@Output() confirm = new EventEmitter();

	@Input() accountNotFound!: boolean;
	@Input() accountNotConfirmed!: boolean;

	constructor(private stateservice: StateManagementService) {}

	ngOnInit(): void {}

	changeVisibility() {
		this.stateservice.toggleUserNotificationVisibility();
	}

	resendCode() {}
}
