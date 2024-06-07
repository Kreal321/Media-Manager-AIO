import { Routes } from '@angular/router';
import { SettingsComponent } from "./features/settings/settings.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', component: DashboardComponent },
  // { path: '**', redirectTo: '' }
];
