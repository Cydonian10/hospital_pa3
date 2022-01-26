import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginData, IResAuth } from '@models/auth.interface';
import { AuthMedicoService } from '../../../../services/auth-medico.service';

@Component( {
  selector: 'app-login-medico',
  templateUrl: './login-medico.component.html',
  styleUrls: [ './login-medico.component.scss' ]
} )
export class LoginMedicoComponent implements OnInit {

  statusLogin: 'loading' | 'success' | 'error' | 'init' = 'init';
  error: string = "";

  myForm = this.fb.group( {
    'email': [ , [ Validators.required ] ],
    'password': [ , [ Validators.required ] ]
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private authMedicoService: AuthMedicoService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const value: ILoginData = { ...this.myForm.value };

    this.statusLogin = 'loading';
    this.authMedicoService.login( value ).subscribe(
      {
        next: ( resp ) => this.handleNext( resp ),
        error: ( resp ) => this.handleError( resp )
      }
    );
  }

  //! ** Estados de submit **
  handleNext ( resp: IResAuth ) {
    this.statusLogin = 'success';
    this.error = '';
    resp.message === 'Usuario no registrado' ?
      this.error = resp.message : this.router.navigateByUrl( "/medicos/citas" );
  }

  handleError ( resp: string ) {
    this.statusLogin = 'error';
    this.error = resp;
  }

}
