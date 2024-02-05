import { Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component'
import { RedirectPageComponent } from './redirectPage/redirectPage.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: ':uuid', component: RedirectPageComponent },
];
