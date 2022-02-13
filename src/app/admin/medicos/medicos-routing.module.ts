import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './pages/medicos/medicos.component';

const routes: Routes = [
  {
    path: "medicos",
    component: MedicosComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MedicosRoutingModule { }
