import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICita, UpdateCitaDto } from '@models/cita.interface';
import { UserCitaService } from '@services/user-cita.service';
import { Subscription } from 'rxjs';
import { CitaService } from '../../../../services/cita.service';

@Component( {
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: [ './citas.component.scss' ]
} )
export class CitasComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public citas: ICita[] = [];

  constructor(
    private userCitaService: UserCitaService,
    private citaService: CitaService
  ) { }

  ngOnInit (): void {
    this.findAll();
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  //! ** Traer todas las citas del usuario **
  findAll () {
    this.subscription.add(
      this.userCitaService.citasUser$.subscribe( resp => this.citas = resp )
    );
  }

  //** Cancelar las citas */
  cancelarCita ( id: string ) {

    let change: UpdateCitaDto = { cliente: 'cancelado' };

    this.subscription.add(
      this.citaService.update( change, id ).subscribe(
        {
          next: ( ( resp ) => {
            console.log( resp );
          } )
        }
      )
    );
  }
}
