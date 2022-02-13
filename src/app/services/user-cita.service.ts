import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICita, IRespCitas } from '@models/cita.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class UserCitaService {

  private url: string = environment.urlBase;
  private _citasUsuario = new BehaviorSubject<ICita[]>( [] );

  public get citasUser$ () {
    return this._citasUsuario.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    this.citasByUser();
  }

  updateCita ( changes: ICita, id: string ) {
    const newValue = this._citasUsuario.value.map( item => {
      if ( item.id === id ) {
        item = changes;
      }
      return item;
    } );
    this._citasUsuario.next( newValue );
  }

  createCita ( data: ICita ) {
    this._citasUsuario.next( [ data, ...this._citasUsuario.value ] );
  }

  private citasByUser () {
    if ( !this._citasUsuario.value === false ) {
      console.log( 'hola desde aqui' );
      this.http.get<IRespCitas>( `${ this.url }/api/citas/user` ).pipe(
        tap( ( resp ) => {
          this._citasUsuario.next( resp.data );
        } )
      ).subscribe();
    }
  }
}
