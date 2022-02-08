import { Component, OnInit } from '@angular/core';
import { MedicoService } from '@services/medico.service';
import { Observable } from 'rxjs';
import { IMedico } from '@models/medico.interface';
import { AuthService } from '@services/auth.service';
import { IUsuario } from '@models/usuario.interface';

@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.scss' ]
} )
export class IndexComponent implements OnInit {

  public medicos!: Observable<IMedico[]>;
  public usuarios!: Observable<IUsuario>;
  public showModal = false;

  constructor(
    private medicoService: MedicoService,
    private authService: AuthService
  ) { }

  ngOnInit (): void {
    this.medicos = this.medicoService.medicos$;
    this.usuarios = this.authService.user$;
  }

  toogleModal () {
    this.showModal = !this.showModal;
  }
}
