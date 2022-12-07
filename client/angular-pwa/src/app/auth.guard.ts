import {Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {StateManagementService} from './state-management.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private loginservice: LoginService,
		private stateservice: StateManagementService,
		private router: Router
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> | Promise<any> | boolean {
		if (this.loginservice.validateLoginStatus()) {
			return true;
		} else {
			this.router.navigateByUrl('/student');
			this.stateservice.toggleLoginFormVisibility();
			return false;
		}
	}
}
