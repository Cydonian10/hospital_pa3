import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule( {
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
} )
export class PerfilModule { }
