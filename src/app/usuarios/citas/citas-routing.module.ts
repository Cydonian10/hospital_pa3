import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './page/cita/cita.component';

const routes: Routes = [
  {
    path: "citas",
    component: CitaComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CitasRoutingModule { }
