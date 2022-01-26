import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitaComponent } from './page/cita/cita.component';


@NgModule({
  declarations: [
    CitaComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
