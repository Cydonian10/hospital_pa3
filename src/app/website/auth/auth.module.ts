import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RegisterMedicoComponent } from './pages/register-medico/register-medico.component';
import { LoginMedicoComponent } from './pages/login-medico/login-medico.component';


@NgModule( {
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutAuthComponent,
    LoginFormComponent,
    RegisterMedicoComponent,
    LoginMedicoComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,

    SharedModule
  ]
} )
export class AuthModule { }
