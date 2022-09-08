import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForemployerComponent } from './foremployer/foremployer.component';
import { ForstudentsComponent } from './forstudents/forstudents.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { JoblistComponent } from './joblist/joblist.component';

const routes: Routes = [
  { path: '', component: FrontpageComponent },
  { path: 'foremployer', component: ForemployerComponent },
  { path: 'forstudents', component: ForstudentsComponent },
  { path: 'joblist', component: JoblistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
