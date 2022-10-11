import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { StudentFrontpageComponent } from './student-frontpage/student-frontpage.component';
import { TopbarComponent } from './topbar/topbar.component';
import { JoblistsmallComponent } from './joblistsmall/joblistsmall.component';

@NgModule({
	declarations: [AppComponent, StudentFrontpageComponent, TopbarComponent, JoblistsmallComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
