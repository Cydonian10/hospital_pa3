import { Injectable } from '@angular/core';
import { IMedico, IRespMedico, IRespMedicos } from '@models/medico.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UpdateMedicoDto } from '../models/medico.interface';

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

  update ( changes: UpdateMedicoDto, id: number ) {
    return this.http.put<IRespMedico>( `${ this.url }/api/medico/update/${ id }`, changes ).pipe(
      tap( ( resp ) => {
        this._medicos.next( this._medicos.value.map( ( item ) => {
          if ( item.id === resp.data.id ) {
            item = { ...item, ...resp.data };
          }
          return item;
        } ) );
      } )
    );
  }

}