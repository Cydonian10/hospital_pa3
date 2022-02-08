import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UpdateMedicoDto } from '@models/medico.interface';

import { AuthMedicoService } from '@services/auth-medico.service';
import { UploadImageService } from '@services/upload-image.service';

@Component( {
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [ './perfil.component.scss' ]
} )
export class PerfilComponent implements OnInit, OnDestroy {

  @ViewChild( 'fileUploader', { static: true } ) file!: ElementRef<HTMLInputElement>;
  @ViewChild( 'img', { static: true } ) img!: ElementRef<HTMLInputElement>;
  public id: number = 0;
  private subscription = new Subscription();
  public cargando: 'initial' | 'cargando' | 'cargado' = 'initial';
  public enviando: 'intial' | 'error' | 'success' = 'intial';

  myForm = this.fb.group( {
    especialidad_id: [ '', [ Validators.required ] ],
    name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    last_name: [ '', [ Validators.required ] ],
    rol: [ '', [ Validators.required ] ],
    photo: [ '', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    status: [ '', [ Validators.required ] ],
    titulo_medico: [ '', [ Validators.required ] ],
    horarios: this.fb.array( [] )
  } );

  myHora = this.fb.control( "", [ Validators.required ] );

  //** Traer una image */
  get image () {
    return this.myForm.get( 'photo' );
  }

  //** Traer el formArray */
  get horariosArr () {
    return this.myForm.get( 'horarios' ) as FormArray;
  }

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private authMedicoService: AuthMedicoService,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
  ) { }

  ngOnInit (): void {
    this.subscription.add(
      this.authMedicoService.myProfile().subscribe( medico => {
        console.log( medico );
        const horarios = JSON.parse( medico.data.horarios );
        horarios.forEach( ( item: string ) => {
          this.horariosArr.push( new FormControl( item ) );
        } );
        this.id = medico.data.id;
        this.myForm.reset( {
          ...medico.data,
          horarios
        } );
      } )
    );
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  };

  //** Agregando un un horaios */
  agragarHorario () {
    if ( this.myHora.invalid ) {
      return;
    }
    this.horariosArr.push( this.fb.control( this.myHora.value ) );
    this.myHora.reset();
  }

  //** Elimando un horario de horarios */
  removeHorario ( index: number ) {
    this.horariosArr.removeAt( index );
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
        console.log( 'todo fue un error' );
        this.cargando = 'initial';
      } ),
      complete: ( () => this.cargando = 'initial' )
    } );
  }

  // ** Subiendo formulario **
  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const update: UpdateMedicoDto = { ...this.myForm.value };
    console.log( this.myForm.value );
    this.authMedicoService.update( update, this.id ).subscribe(
      {
        next: ( ( resp ) => {
          this.enviando = 'success';
          console.log( resp );
        } ),
        error: ( () => this.enviando === 'error' ),
        complete: ( () => {
          setTimeout( () => {
            this.enviando = 'intial';
          }, 3000 );;
        } )
      }
    );
  }

}
