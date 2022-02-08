import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarUsuarioComponent } from '../shared/components/nav-bar-usuario/nav-bar-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: NavBarUsuarioComponent,
    children: [
      {
        path: "", loadChildren: () => import( "./citas/citas.module" ).then( m => m.CitasModule )
      },
      {
        path: "", loadChildren: () => import( "./medicos/medicos.module" ).then( m => m.MedicosModule )
      },
      {
        path: "", loadChildren: () => import( "./perfil/perfil.module" ).then( m => m.PerfilModule )
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class UsuariosRoutingModule { }
