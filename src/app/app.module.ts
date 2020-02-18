import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UiModule } from './ui/ui.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RestComponent } from './rest/rest.component';
import { ActiveComponent } from './active/active.component';
import { ContactComponent } from './contact/contact.component';

import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { PropertyComponent } from './property/property.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    RegisterComponent,
    AdminComponent,
    PropertyComponent,
    ContactComponent,

    HomeComponent,
    HeaderComponent, FooterComponent,
    RestComponent,
    IndexComponent,
    ActiveComponent

  ],
  imports: [
    BrowserModule,
       AppRoutingModule,
       HttpClientModule,
       ReactiveFormsModule , FormsModule,
       MDBBootstrapModule.forRoot(),
       NgxChartsModule,
       NgtUniversalModule,
       UiModule,
       BrowserAnimationsModule

     ],
  providers: [ AuthGuardService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
