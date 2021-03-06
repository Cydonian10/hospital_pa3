import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { CardMedicoComponent } from './components/card-medico/card-medico.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule( {
  declarations: [
    IndexComponent,
    CardMedicoComponent,
    ModalInfoComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
} )
export class MedicosModule { }
