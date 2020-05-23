import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';

import { AuthService } from '@app/services/auth.service';
import { ApiService } from '@app/services/api.service';
import { PatientService } from './services/patient.service';
import { AuthGuardService } from './services/auth-guard';
import { RoleGuardService } from './services/role-guard';

import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor} from './services/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppStoreModule } from '@app/store/app-store.module';

import { AppComponent } from '@app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { ReferralComponent } from './components/referral/referral.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReadmessagesComponent } from './components/readmessages/readmessages.component';
import { ManageReferralsComponent } from './components/manage-referrals/manage-referrals.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ListService } from './services/list.service';
import { DiaryService } from './services/DIaryService';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    ErrorComponent,
    ReferralComponent,
    MessagesComponent,
    DashboardComponent,
    ReadmessagesComponent,
    ManageReferralsComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ApiService,
    PatientService,
    ListService,
    DiaryService,
    JwtHelperService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  exports: [
    CoreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
