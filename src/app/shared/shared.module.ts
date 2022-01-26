import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TituloComponent } from './components/titulo/titulo.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LabelComponent } from './components/label/label.component';
import { ButtonComponent } from './components/button/button.component';
import { NavBarUsuarioComponent } from './components/nav-bar-usuario/nav-bar-usuario.component';
import { NavBarMedicoComponent } from './components/nav-bar-medico/nav-bar-medico.component';



@NgModule( {
  declarations: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent,
    NavBarUsuarioComponent,
    NavBarMedicoComponent
  ],
  exports: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent,
    NavBarUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
} )
export class SharedModule { }
