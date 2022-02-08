import { Injectable } from '@angular/core';
import { IMedico, IRespMedicos } from '@models/medico.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class MedicoService {

  private url = environment.urlBase;
  private _medicos = new BehaviorSubject<IMedico[]>( [] );
  private _medico = new BehaviorSubject<IMedico>( {} as IMedico );

  get medicos$ (): Observable<IMedico[]> {
    return this._medicos.asObservable();
  };

  get medico$ (): Observable<IMedico> {
    return this._medico.asObservable();
  };

  constructor(
    private http: HttpClient
  ) {
    this.findAll();
  }

  findAll () {
    if ( !this._medicos.value === false ) {
      this.http.get<IRespMedicos>( `${ this.url }/api/medicos` ).subscribe(
        {
          next: ( ( resp ) => this._medicos.next( resp.data ) )
        }
      );
    }
  }

  oneMedico ( id: number ) {
    const medico = this._medicos.value.find( item => item.id === id );
    medico && this._medico.next( medico );
  }
}