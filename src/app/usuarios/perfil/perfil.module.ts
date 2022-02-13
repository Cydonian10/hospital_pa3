import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionComponent } from './pages/notificacion/notificacion.component';


@NgModule( {
  declarations: [
    PerfilComponent,
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
} )
export class PerfilModule { }
