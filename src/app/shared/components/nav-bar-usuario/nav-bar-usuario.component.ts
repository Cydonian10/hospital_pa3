import { Component, OnInit } from '@angular/core';
import { IUsuario } from '@models/usuario.interface';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserCitaService } from '../../../services/user-cita.service';

@Component( {
  selector: 'app-nav-bar-usuario',
  templateUrl: './nav-bar-usuario.component.html',
  styleUrls: [ './nav-bar-usuario.component.scss' ]
} )
export class NavBarUsuarioComponent implements OnInit {

  user!: Observable<IUsuario>;

  notificacion = 0;
  constructor(
    private authService: AuthService,
    private userCitaService: UserCitaService
  ) { }

  ngOnInit (): void {
    this.userCitaService.citasUser$.pipe(
      map( ( resp ) => resp.filter( item => item.estado === 'aceptado' ) )
    ).subscribe( resp => this.notificacion = resp.length );

    this.user = this.authService.user$;
  }

  logaout () {
    this.authService.logout();
  }

}
