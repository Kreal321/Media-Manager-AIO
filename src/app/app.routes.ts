import { Routes } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {PageSettingsComponent} from "./features/settings/pages/page-settings/page-settings.component";

export const routes: Routes = [
  { path: 'settings', component: PageSettingsComponent },
  { path: '', component: DashboardComponent },
  // { path: '**', redirectTo: '' }
];
