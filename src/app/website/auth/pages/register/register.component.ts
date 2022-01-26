import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
} )
export class RegisterComponent implements OnInit {

  statusLogin: 'loading' | 'success' | 'error' | 'init' = 'init';
  error: string = "";

  myForm = this.fb.group( {
    'name': [ , [ Validators.required ] ],
    'email': [ , [ Validators.required ] ],
    'password': [ , [ Validators.required ] ],
    'password_confirmation': [ , [ Validators.required ] ]
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    this.statusLogin = 'loading';
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const data = { ...this.myForm.value };
    this.authService.register( data ).subscribe(
      {
        next: ( resp ) => {
          this.statusLogin = 'success';
          this.error = '';
          console.log( resp );
        },
        error: ( error ) => {
          this.statusLogin = 'error';
          this.error = error;
          console.log( error );
        }
      }
    );


  }

}
