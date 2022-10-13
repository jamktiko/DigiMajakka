import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StudentFrontpageComponent} from './student-frontpage/student-frontpage.component';
import {TopbarComponent} from './topbar/topbar.component';
import {JoblistsmallComponent} from './joblistsmall/joblistsmall.component';
import {ProfilecarouselComponent} from './profilecarousel/profilecarousel.component';
import {ModalComponent} from './modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		StudentFrontpageComponent,
		TopbarComponent,
		JoblistsmallComponent,
		ProfilecarouselComponent,
		ModalComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
