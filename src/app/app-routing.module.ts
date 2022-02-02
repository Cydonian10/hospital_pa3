import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthMedicoGuard } from './core/guards/auth-medico.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: () => import( "./website/website.module" ).then( m => m.WebsiteModule )
  },
  {
    path: "usuarios",
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import( "./usuarios/usuarios.module" ).then( m => m.UsuariosModule )
  },
  {
    path: "medicos",
    canActivate: [ AuthMedicoGuard ],
    canLoad: [ AuthMedicoGuard ],
    loadChildren: () => import( "./medicos/medicos.module" ).then( m => m.MedicosModule )
  },
  {
    path: "**",
    redirectTo: "home"
  }

];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule( {
  imports: [ RouterModule.forRoot( routes, routerOptions ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
