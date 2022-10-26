import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { StudentFrontpageComponent } from './student-frontpage/student-frontpage.component';
import { TopbarComponent } from './topbar/topbar.component';
import { JoblistsmallComponent } from './joblistsmall/joblistsmall.component';
import { ProfilecarouselComponent } from './profilecarousel/profilecarousel.component';
import { EditContactInfoComponent } from './edit-contact-info/edit-contact-info.component';
import {ModalComponent} from './modal/modal.component';
import { EditPersonalInfoComponent } from './edit-personal-info/edit-personal-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPhotoComponent } from './add-photo/add-photo.component';

@NgModule({
	declarations: [AppComponent, StudentFrontpageComponent, TopbarComponent, JoblistsmallComponent, ProfilecarouselComponent, ModalComponent, EditContactInfoComponent, EditPersonalInfoComponent, AddPhotoComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
