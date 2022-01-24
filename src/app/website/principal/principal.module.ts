import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '@shared/shared.module';


@NgModule( {
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule
  ]
} )
export class PrincipalModule { }
