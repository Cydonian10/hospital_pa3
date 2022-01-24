import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import( "./auth/auth.module" ).then( m => m.AuthModule ),
  },
  {
    path: "",
    loadChildren: () => import( "./principal/principal.module" ).then( m => m.PrincipalModule )
  },
  {
    path: "**",
    redirectTo: "home"
  }
];



@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class WebsiteRoutingModule { }
