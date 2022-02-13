import { Component, OnInit, Pipe } from '@angular/core';
import { MedicoService } from '@services/medico.service';
import { filter, map, Observable } from 'rxjs';
import { IMedico } from '@models/medico.interface';
import { AuthService } from '@services/auth.service';
import { IUsuario } from '@models/usuario.interface';
import { FormControl } from '@angular/forms';

@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.scss' ]
} )
export class IndexComponent implements OnInit {

  // public medicos!: Observable<IMedico[]>;
  public usuarios!: Observable<IUsuario>;
  public medicos: IMedico[] = [];
  public mostrar: IMedico[] = [];
  public showModal = false;

  search = new FormControl( '' );

  constructor(
    private medicoService: MedicoService,
    private authService: AuthService
  ) { }

  ngOnInit (): void {
    // this.medicos = this.medicoService.medicos$;
    this.usuarios = this.authService.user$;
    this.getMedicos();
  }

  getMedicos () {
    this.medicoService.medicos$.subscribe( resp => {
      this.medicos = resp;
      this.mostrar = this.medicos;
    } );
  }

  filterMedico ( e: Event ) {
    e.preventDefault();
    console.log( 'hola' );
    if ( this.search.value ) {
      this.mostrar = this.medicos.filter( item => item.especialidad === this.search.value );

    }
  }

  toogleModal () {
    this.showModal = !this.showModal;
  }
}
