import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICita } from '@models/cita.interface';
import { UserCitaService } from '@services/user-cita.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: [ './citas.component.scss' ]
} )
export class CitasComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public citas: ICita[] = [];

  constructor(
    private userCitaService: UserCitaService
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

}
