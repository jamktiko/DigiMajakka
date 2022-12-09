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
import {GuideLightEntrepreneurComponent} from './guide-light-entrepreneur/guide-light-entrepreneur.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {ProfilelistComponent} from './profilelist/profilelist.component';
import {JobAnnouncementComponent} from './job-announcement/job-announcement.component';

const routes: Routes = [
	// Routes. Path is the url they are accessed by (localhost:4200/<path>), and component declares
	// which component to show in that url.
	{path: 'student', component: StudentFrontpageComponent},
	{
		path: 'student/profile',
		component: ProfileComponent,
		canActivate: [AuthGuard],
	},
	{path: 'profiles/:id', component: StudentProfilesComponent},
	{path: 'employer', component: EmployerComponent},
	// Duplicate 'student/joblist' route? REMOVE WHEN JOBLISTCOMPONENT READY
	{path: 'student/joblist', component: JoblistComponent},
	{path: 'jobadvert/delete/:id', component: DeleteJobAdvertComponent},
	{path: 'guide', component: GuideComponent},
	{
		path: 'student/joblist',
		component: JoblistComponent,
		canActivate: [AuthGuard],
	},
	{path: 'profilelist', component: ProfilelistComponent},
	{path: 'guide/forstudent', component: GuideLightEntrepreneurComponent},
	{path: 'termsandconditions', component: TermsAndConditionsComponent},
	{path: 'privacypolicy', component: PrivacyPolicyComponent},
	{path: '', component: FrontpageComponent},
	{path: 'student/joblist/listing/:id', component: JobAnnouncementComponent},
	{path: 'home', component: FrontpageComponent},
	// Wildcard-route that redirects to frontpage if user tries to activate route that does not exist
	{path: '**', component: FrontpageComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
