import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';


import { MaterialModule } from '../material/material.module';



@NgModule( {
  declarations: [ NavigationComponent ],
  exports: [ NavigationComponent ],
  imports: [
    CommonModule,

    MaterialModule,

    RouterModule
  ]
} )
export class ComponentsModule { }
