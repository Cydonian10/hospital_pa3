import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component( {
  selector: 'app-nav-bar-usuario',
  templateUrl: './nav-bar-usuario.component.html',
  styleUrls: [ './nav-bar-usuario.component.scss' ]
} )
export class NavBarUsuarioComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit (): void {
  }

  logaout () {
    this.authService.logout();
  }

}
