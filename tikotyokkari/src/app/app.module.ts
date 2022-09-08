import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForemployerComponent } from './foremployer/foremployer.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ForstudentsComponent } from './forstudents/forstudents.component';
import { JoblistComponent } from './joblist/joblist.component';

@NgModule({
  declarations: [
    AppComponent,
    ForemployerComponent,
    FrontpageComponent,
    ForstudentsComponent,
    JoblistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
