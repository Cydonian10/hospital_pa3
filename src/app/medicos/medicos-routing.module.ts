import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarMedicoComponent } from '@shared/components/nav-bar-medico/nav-bar-medico.component';
import { AuthMedicoGuard } from '../core/guards/auth-medico.guard';

const routes: Routes = [
  {
    path: "",
    component: NavBarMedicoComponent,
    canActivate: [ AuthMedicoGuard ],
    canLoad: [ AuthMedicoGuard ],
    children: [
      {
        path: "citas", loadChildren: () => import( "./citas/citas.module" ).then( m => m.CitasModule )
      },
      {
        path: "perfil", loadChildren: () => import( "./perfil/perfil.module" ).then( m => m.PerfilModule )
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MedicosRoutingModule { }
