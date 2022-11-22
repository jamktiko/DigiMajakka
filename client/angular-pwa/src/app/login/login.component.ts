import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(private loginservice: LoginService) {}

	email: string = '';
	password: string = '';

	ngOnInit(): void {}

	changeVisibility() {}

	onSubmit(formData: any) {
		console.log(formData.email + formData.password);
		this.loginservice.login(formData.email, formData.password);
	}
}
