/* eslint-disable @typescript-eslint/consistent-type-imports */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { StudentFrontpageComponent } from './student-frontpage/student-frontpage.component';

const routes: Routes = [
	{path: 'student', component: StudentFrontpageComponent},
	{path: 'profile', component: ProfileComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
