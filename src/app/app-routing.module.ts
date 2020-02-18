import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { ProfileComponent} from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service'
import { LogoutComponent } from './logout/logout.component'
import { RegisterComponent } from './register/register.component'
import { RestComponent } from './rest/rest.component'

import { AdminComponent } from './admin/admin.component'
import { PropertyComponent } from './property/property.component'
import { HomeComponent } from './home/home.component'
import { IndexComponent } from './index/index.component';
import { ActiveComponent } from './active/active.component';
import { ContactComponent } from './contact/contact.component';

import { Role } from './models/role';

const routes: Routes = [
  {     path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuardService], 
  data: { roles: [Role.User,Role.Admin] }  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rest', component: RestComponent },
  { path: 'rest/:token', component: RestComponent },
  { path: 'active/:token', component: ActiveComponent },
  { path: 'active', component: ActiveComponent },

  { path: '', component: IndexComponent },
  
  { path: 'property/:title', component: PropertyComponent },
  { path: 'home', component: HomeComponent },
  {path : '', component : LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'contact', component: ContactComponent },

  { 
    path: 'dashboard', 
    component: AdminComponent, 
    canActivate: [AuthGuardService], 
    data: { roles: [Role.Admin] } 
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
