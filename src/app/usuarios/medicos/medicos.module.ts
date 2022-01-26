import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule( {
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule
  ]
} )
export class MedicosModule { }
