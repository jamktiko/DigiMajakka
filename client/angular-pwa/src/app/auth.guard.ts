import {Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';
import {JWTTokenService} from './jwttoken.service';
import {LocalStorageService} from './local-storage.service';
import {LoginService} from './login.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private loginService: LoginService,
		private storageService: LocalStorageService,
		private jwtservice: JWTTokenService
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> | Promise<any> | boolean {
		if (this.jwtservice.getUser()) {
			if (this.jwtservice.isTokenExpired()) {
				// Functionality to redirect to login-page
			} else {
				return true;
			}
		} else {
			return new Promise((resolve) => {
				this.loginService
					.loginCallBack()
					.then((e: any) => {
						resolve(true);
					})
					.catch((e) => {});
			});
		}
	}
}
