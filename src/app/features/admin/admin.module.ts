import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAdmin from './state';
import { AdminEffects } from './state/admin.effects';

import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'users', component: AdminUsersComponent }
    ]
  },
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'user', component: AdminUserComponent }
    ]
  },
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'newuser', component: NewUserComponent }
    ]
  },
  {
    path: '**', component: AdminComponent
  },
  {
    path: '', component: AdminComponent
  }



];


@NgModule({
  declarations: [
    AdminNavbarComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminUserComponent,
    NewUserComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature([AdminEffects])
  ]
})
export class AdminModule { }
