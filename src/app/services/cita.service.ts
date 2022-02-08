import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateCitaDto, ICita, IRespCitas, UpdateCitaDto } from '@models/cita.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class CitaService {

  private url: string = environment.urlBase;

  constructor(
    private http: HttpClient
  ) {
  }

  create ( data: CreateCitaDto ) {
    return this.http.post( `${ this.url }/api/citas`, data );
  }

  update ( changes: UpdateCitaDto, id: string ) {
    return this.http.put( `${ this.url }/citas/${ id }`, changes );
  }




}
