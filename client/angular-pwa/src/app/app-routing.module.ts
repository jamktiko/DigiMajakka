/* eslint-disable @typescript-eslint/consistent-type-imports */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {StudentFrontpageComponent} from './student-frontpage/student-frontpage.component';
import {EmployerComponent} from './employer/employer.component';
import {StudentProfilesComponent} from './student-profiles/student-profiles.component';

const routes: Routes = [
	// Routes. Path is the url they are accessed by (localhost:4200/<path>), and component declares
	// which component to show in that url.
	{path: 'student', component: StudentFrontpageComponent},
	{path: 'profile', component: ProfileComponent},
	{path: 'profiles/:id', component: StudentProfilesComponent},
	{path: 'employer', component: EmployerComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
