import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICita, IRespCitas } from '@models/cita.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class MedicoCitaService {

  private url: string = environment.urlBase;
  private _citasMedico = new BehaviorSubject<ICita[]>( [] );


  constructor(
    private http: HttpClient
  ) { }

  citasByMedico () {
    if ( !this._citasMedico.value === false ) {
      this.http.get<IRespCitas>( `${ this.url }/api/citas/medicos` ).pipe(
        tap( ( resp ) => this._citasMedico.next( resp.data ) )
      );
    }
  }
}
