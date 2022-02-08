import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILoginData, IResAuth, IRegistroMedico } from '../models/auth.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { IRespMedico, UpdateMedicoDto } from '../models/medico.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AuthMedicoService {

  private url = environment.urlBase;
  public medico$ = new BehaviorSubject<IRespMedico>( {} as IRespMedico );

  get medico () {
    return this.medico$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login ( data: ILoginData ) {
    return this.http.post<IResAuth>( `${ this.url }/api/login/medico`, data ).pipe(
      tap( ( resp ) => {
        if ( resp.token ) {
          this.localStorageService.save( resp.token, 'token' );
          this.myProfile().subscribe();
        }
      } ),
      catchError( ( error: HttpErrorResponse ) => {
        return this.evalError( error );
      } ),
    );
  }

  myProfile () {
    if ( Object.keys( this.medico$.value ).length === 0 ) {
      console.log( 'hola' );
      return this.http.get<IRespMedico>( `${ this.url }/api/medico-profile` ).pipe(
        tap( ( resp ) => this.medico$.next( resp ) )
      );
    }
    return this.medico$.asObservable();
  }

  register ( data: IRegistroMedico ) {
    return this.http.post<IRespMedico>( `${ this.url }/api/register/medico`, data ).pipe(
      catchError( ( error: HttpErrorResponse ) => this.evalError( error ) )
    );
  }

  logout () {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.localStorageService.get( 'token' ) }`
    } );

    localStorage.removeItem( 'token' );
    return this.http.get<IResAuth>( `${ this.url }/api/logout/medico`, { headers } );
  }

  update ( changes: UpdateMedicoDto, id: number ) {
    return this.http.put<IRespMedico>( `${ this.url }/api/medico/update/${ id }`, changes );
  }

  //! ** Evaluamos el error **
  evalError ( error: HttpErrorResponse ) {

    if ( error.status === HttpStatusCode.InternalServerError ) {
      return throwError( () => 'Algo esta fallando en el servidor' );
    }
    if ( error.status === HttpStatusCode.UnprocessableEntity ) {
      return throwError( () => 'Datos mal escritos' );
    }

    return throwError( () => 'Ups algo salio mal' );
  }
}

