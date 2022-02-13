import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';

const routes: Routes = [

  //** admin/* */
  {
    path: "",
    component: NavigationComponent,
    children: [
      {
        path: "",
        loadChildren: () => import( "./medicos/medicos.module" ).then( m => m.MedicosModule )
      }
    ]
  }

];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule { }
