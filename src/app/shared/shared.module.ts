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
import { AlertComponent } from './components/alert/alert.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { ButtonSecondaryComponent } from './components/button-secondary/button-secondary.component';
import { ToArrayPipe } from './pipes/to-array.pipe';
import { ButtonCancelarComponent } from './components/button-cancelar/button-cancelar.component';



@NgModule( {
  declarations: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent,
    NavBarUsuarioComponent,
    NavBarMedicoComponent,
    AlertComponent,
    AlertErrorComponent,
    ButtonSecondaryComponent,
    ToArrayPipe,
    ButtonCancelarComponent
  ],
  exports: [
    NavBarComponent,
    TituloComponent,
    ErrorMessageComponent,
    LabelComponent,
    ButtonComponent,
    NavBarUsuarioComponent,
    AlertComponent,
    AlertErrorComponent,
    ButtonSecondaryComponent,
    ToArrayPipe,
    ButtonCancelarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
} )
export class SharedModule { }
