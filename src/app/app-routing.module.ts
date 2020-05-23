import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '@app/services/auth-guard';
import { RoleGuardService as RoleGuard } from '@app/services/role-guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from '@app/components/error/error.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReadmessagesComponent } from './components/readmessages/readmessages.component';
import { ReferralComponent } from './components/referral/referral.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageReferralsComponent } from './components/manage-referrals/manage-referrals.component';
import { DiaryComponent } from './features/diary/components/diary/diary.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'message', component: MessagesComponent },
  { path: 'readmessages', component: ReadmessagesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'referral', component: ReferralComponent },
  { path: 'managereferrals', component: ManageReferralsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'patients',
    loadChildren: () => import('@app/features/patient/patient.module').then(m => m.PatientModule),
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'SuperAdmin'] }
  },
  {
    path: 'diaries',
    loadChildren: () => import('@app/features/diary/diary.module').then(m => m.DiaryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'SuperAdmin'] }
  },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
