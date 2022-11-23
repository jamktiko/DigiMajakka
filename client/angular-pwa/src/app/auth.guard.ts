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
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private loginservice: LoginService,
		private storageservice: LocalStorageService,
		private jwtservice: JWTTokenService,
		private router: Router
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> | Promise<any> | boolean {
		if (this.storageservice.get('token')) {
			return true;
		} else {
			return false;
		}
		//	if (this.jwtservice.jwtToken) {
		//		if (this.jwtservice.isTokenExpired()) {
		//			// Functionality to redirect to login-page
		//			this.router.navigateByUrl('/notauthorized');
		//			return false;
		//		} else {
		//			return true;
		//		}
		//	} else {
		//		return new Promise((resolve) => {
		//			this.loginService
		//				.loginCallBack()
		//				.then((e: any) => {
		//					resolve(true);
		//				})
		//				.catch((e) => {
		//					// Functionality to redirect to login-page
		//					this.router.navigateByUrl('/notauthorized');
		//				});
		//		});
		//	}
	}
}
