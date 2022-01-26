import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthMedicoService } from '@services/auth-medico.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [ './perfil.component.scss' ]
} )
export class PerfilComponent implements OnInit, OnDestroy {

  @ViewChild( 'fileUploader', { static: true } ) file!: ElementRef<HTMLInputElement>;
  @ViewChild( 'img', { static: true } ) img!: ElementRef<HTMLInputElement>;

  private subscription = new Subscription();
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
  } );

  get image () {
    return this.myForm.get( 'photo' );
  }

  constructor(
    private authMedicoService: AuthMedicoService,
    private fb: FormBuilder
  ) { }

  ngOnInit (): void {
    this.subscription.add(
      this.authMedicoService.medico$.subscribe( medico => {
        this.myForm.reset( medico );
        console.log( this.myForm.value );
      } )
    );
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  changeImage ( e: Event ) {
    const event = e.target as HTMLInputElement;
    let file = event.files![ 0 ];
    let imgUrl = URL.createObjectURL( file );
    this.img.nativeElement.style.backgroundImage = "url('" + imgUrl + "')";
  }
}
