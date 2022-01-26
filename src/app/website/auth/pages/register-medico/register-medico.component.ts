import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthMedicoService } from '../../../../services/auth-medico.service';
import { IRegistroMedico } from '../../../../models/auth.interface';

@Component( {
  selector: 'app-register-medico',
  templateUrl: './register-medico.component.html',
  styleUrls: [ './register-medico.component.scss' ]
} )
export class RegisterMedicoComponent implements OnInit {

  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  error: string = '';
  myForm = this.fb.group( {
    'name': [ , [ Validators.required ] ],
    'last_name': [ , [ Validators.required ] ],
    'email': [ , [ Validators.required ] ],
    'password': [ 's', [ Validators.required ] ],
    'password_confirmation': [ 's', [ Validators.required ] ],
    'especialidad_id': [ , [ Validators.required ] ]
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private authMedicoService: AuthMedicoService
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    this.status = 'loading';
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const data: IRegistroMedico = { ...this.myForm.value };
    console.log( data );
    this.authMedicoService.register( data ).subscribe(
      {
        next: ( resp ) => {
          this.status = 'success';
          this.error = '';
          console.log( resp );
        },
        error: ( error ) => {
          this.status = 'error';
          this.error = error;
          console.log( error );
        }
      }
    );
  }

}
