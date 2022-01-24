import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component( {
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ]
} )
export class LoginFormComponent {

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
    private fb: FormBuilder
  ) { }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log( this.myForm.value );
  }


}
