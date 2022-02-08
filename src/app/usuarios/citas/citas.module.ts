import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitaComponent } from './page/cita/cita.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CitasComponent } from './page/citas/citas.component';


@NgModule( {
  declarations: [
    CitaComponent,
    CitasComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
} )
export class CitasModule { }
