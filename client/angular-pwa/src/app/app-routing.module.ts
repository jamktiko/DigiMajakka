/* eslint-disable @typescript-eslint/consistent-type-imports */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {StudentFrontpageComponent} from './student-frontpage/student-frontpage.component';
import {EmployerComponent} from './employer/employer.component';
import {StudentProfilesComponent} from './student-profiles/student-profiles.component';
import {JoblistComponent} from './joblist/joblist.component';
import {DeleteJobAdvertComponent} from './delete-job-advert/delete-job-advert.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {GuideComponent} from './guide/guide.component';
import {ProfilelistComponent} from './profilelist/profilelist.component';

const routes: Routes = [
	// Routes. Path is the url they are accessed by (localhost:4200/<path>), and component declares
	// which component to show in that url.
	{path: 'student', component: StudentFrontpageComponent},
	{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{path: 'profiles/:id', component: StudentProfilesComponent},
	{path: 'employer', component: EmployerComponent},
	// Duplicate 'student/joblist' route?
	{path: 'student/joblist', component: JoblistComponent},
	{path: 'jobadvert/delete/:id', component: DeleteJobAdvertComponent},
	{path: 'guide', component: GuideComponent},
	{
		path: 'student/joblist',
		component: JoblistComponent,
		canActivate: [AuthGuard],
	},
	{path: 'profilelist', component: ProfilelistComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
