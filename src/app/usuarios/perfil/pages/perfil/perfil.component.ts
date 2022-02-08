import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadImageService } from '@services/upload-image.service';
import { UpdateUsuarioDto } from '@models/usuario.interface';

@Component( {
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [ './perfil.component.scss' ]
} )
export class PerfilComponent implements OnInit {

  public cargando: 'initial' | 'cargando' | 'cargado' = 'initial';
  public enviando: 'intial' | 'error' | 'success' = 'intial';
  public id: string = '';
  myForm = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    last_name: [ '', [ Validators.required ] ],
    rol: [ '', [ Validators.required ] ],
    photo: [ '', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    status: [ '', [ Validators.required ] ],
  } );

  //** Traer una image */
  get image () {
    return this.myForm.get( 'photo' );
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit (): void {
    this.authService.user$.subscribe( resp => {
      this.id = resp.id;
      this.myForm.reset( { ...resp } );
    } );
  }

  // ** Change image **
  changeImage ( e: Event ) {
    this.cargando = 'cargando';

    this.uploadImageService.uploadFile( e ).subscribe( {
      next: ( ( url ) => {
        this.myForm.get( "photo" )?.setValue( url );
        this.cargando = 'cargado';
      } ),
      error: ( () => {
        this.cargando = 'initial';
      } ),
      complete: ( () => this.cargando = 'initial' )
    } );
  }

  //** Subiendo el formulario */
  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const changes: UpdateUsuarioDto = { ...this.myForm.value };
    this.authService.update( changes, this.id ).subscribe(
      {
        next: ( () => this.enviando = 'success' )
      }
    );

  }
}
