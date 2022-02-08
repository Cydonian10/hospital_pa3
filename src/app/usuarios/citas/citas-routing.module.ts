import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './page/cita/cita.component';
import { CitasComponent } from './page/citas/citas.component';

const routes: Routes = [
  {
    path: "create-citas/:id",
    component: CitaComponent
  },
  {
    path: "citas",
    component: CitasComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CitasRoutingModule { }
