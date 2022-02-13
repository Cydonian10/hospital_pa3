import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '@shared/shared.module';
import { UdpateComponent } from './components/udpate/udpate.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule( {
  declarations: [
    MedicosComponent,
    UdpateComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
} )
export class MedicosModule { }
