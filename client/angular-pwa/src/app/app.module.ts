import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {StudentFrontpageComponent} from './student-frontpage/student-frontpage.component';
import {TopbarComponent} from './topbar/topbar.component';
import {JoblistsmallComponent} from './joblistsmall/joblistsmall.component';
import {ProfilecarouselComponent} from './profilecarousel/profilecarousel.component';
import {EditContactInfoComponent} from './edit-contact-info/edit-contact-info.component';
import {ModalComponent} from './modal/modal.component';
import {EditPersonalInfoComponent} from './edit-personal-info/edit-personal-info.component';

import {AddPhotoComponent} from './add-photo/add-photo.component';
import {ProfileComponent} from './profile/profile.component';
import {EditAboutMeComponent} from './edit-about-me/edit-about-me.component';
import {EditAttachmentsComponent} from './edit-attachments/edit-attachments.component';
import {AppRoutingModule} from './app-routing.module';
import {UnSavedChangesComponent} from './un-saved-changes/un-saved-changes.component';
import {EmployerComponent} from './employer/employer.component';
import {EditSkillsComponent} from './edit-skills/edit-skills.component';
import {JobAnnouncementComponent} from './job-announcement/job-announcement.component';

@NgModule({
	declarations: [
		AppComponent,
		StudentFrontpageComponent,
		TopbarComponent,
		JoblistsmallComponent,
		ProfilecarouselComponent,
		ProfileComponent,
		ModalComponent,
		EditContactInfoComponent,
		EditPersonalInfoComponent,
		AddPhotoComponent,
		EditAboutMeComponent,
		EditAttachmentsComponent,
		UnSavedChangesComponent,
		EmployerComponent,
		EditSkillsComponent,
		JobAnnouncementComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		ImageCropperModule,
	],
	providers: [ProfileComponent],
	bootstrap: [AppComponent],
})
export class AppModule {}
