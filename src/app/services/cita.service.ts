import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateCitaDto, ICita, IRespCita, IRespCitas, UpdateCitaDto } from '@models/cita.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { UserCitaService } from './user-cita.service';

@Injectable( {
  providedIn: 'root'
} )
export class CitaService {

  private url: string = environment.urlBase;

  constructor(
    private http: HttpClient,
    private userCitaService: UserCitaService
  ) {
  }

  create ( data: CreateCitaDto ) {
    return this.http.post<IRespCita>( `${ this.url }/api/citas`, data ).pipe(
      tap( ( resp ) => this.userCitaService.createCita( resp.data ) )
    );
  }

  update ( changes: UpdateCitaDto, id: string ) {
    return this.http.put<IRespCita>( `${ this.url }/api/citas/${ id }`, changes, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    } ).pipe(
      tap( ( resp ) => this.userCitaService.updateCita( resp.data, id ) )
    );
  }

}
