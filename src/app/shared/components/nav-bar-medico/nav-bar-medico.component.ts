import { Component, OnInit } from '@angular/core';
import { AuthMedicoService } from '../../../services/auth-medico.service';

@Component( {
  selector: 'app-nav-bar-medico',
  templateUrl: './nav-bar-medico.component.html',
  styleUrls: [ './nav-bar-medico.component.scss' ]
} )
export class NavBarMedicoComponent implements OnInit {

  constructor( private authMedicoService: AuthMedicoService ) { }

  ngOnInit (): void {
  }

  logaout () {
    this.authMedicoService.logout();
  }
}
