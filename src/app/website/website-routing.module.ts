import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import( "./auth/auth.module" ).then( m => m.AuthModule ),
  },
  {
    path: "",
    loadChildren: () => import( "./principal/principal.module" ).then( m => m.PrincipalModule )
  }
];



@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class WebsiteRoutingModule { }
