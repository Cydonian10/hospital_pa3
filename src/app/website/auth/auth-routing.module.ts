import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterMedicoComponent } from './pages/register-medico/register-medico.component';
import { LoginMedicoComponent } from './pages/login-medico/login-medico.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "register-medico",
    component: RegisterMedicoComponent
  },
  {
    path: "login-medico",
    component: LoginMedicoComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AuthRoutingModule { }
