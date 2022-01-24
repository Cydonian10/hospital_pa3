import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TituloComponent } from './components/titulo/titulo.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LabelComponent } from './components/label/label.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule( {
  declarations: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent
  ],
  exports: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent

  ],
  imports: [
    CommonModule,
    RouterModule
  ]
} )
export class SharedModule { }
