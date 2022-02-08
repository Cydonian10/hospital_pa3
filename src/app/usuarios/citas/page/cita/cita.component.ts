import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateCitaDto } from '@models/cita.interface';
import { CitaService } from '@services/cita.service';

@Component( {
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: [ './cita.component.scss' ]
} )
export class CitaComponent implements OnInit {

  public enviando: 'intial' | 'enviando' | 'error' | 'success' = 'intial';

  public myForm = this.fb.group( {
    medico_id: [ , [ Validators.required ] ],
    name: [ , [ Validators.required ] ],
    description: [ , [ Validators.required ] ],
  } );


  public campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private citaService: CitaService
  ) { }

  ngOnInit (): void {
    //** Obtenendo el Id de medico */
    this.route.paramMap.subscribe( resp => {
      this.myForm.get( 'medico_id' )?.setValue( resp.get( 'id' ) );
    } );
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.enviando = 'enviando';
    const data: CreateCitaDto = { ...this.myForm.value };

    this.citaService.create( data ).subscribe(
      {
        next: ( ( resp ) => {
          this.enviando = 'success';
          console.log( resp );
        } ),
        error: ( () => {
          this.enviando = 'error';
        } ),
        complete: ( () => {
          setTimeout( () => {
            this.enviando = 'intial';
          }, 3000 );
        } )
      }
    );
  }

}
