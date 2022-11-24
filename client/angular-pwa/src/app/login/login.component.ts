import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {JWTTokenService} from '../jwttoken.service';
import {StateManagementService} from '../state-management.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(
		private loginservice: LoginService,
		private jwtservice: JWTTokenService,
		private stateservice: StateManagementService,
		private localstorageservice: LocalStorageService
	) {}

	email: string = '';
	password: string = '';
	tokens: any;

	ngOnInit(): void {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}

	onSubmit(formData: any) {
		console.log(formData.email + formData.password);
		this.loginservice
			.login(formData.email, formData.password)
			.subscribe((tokens) => {
				console.log('Both tokens' + tokens);
				this.tokens = tokens;
				this.jwtservice.setToken(this.tokens.accessToken);
				console.log('In logincomponent: ' + this.jwtservice.jwtToken);
				this.jwtservice.getDecodedToken();
				this.localstorageservice.set('token', this.tokens.accessToken);
				this.localstorageservice.set('loggedIn', 'true');
				this.stateservice.loggedIn = true;
				console.log(this.stateservice.loggedIn);
				this.changeVisibility();
			});
	}
}
