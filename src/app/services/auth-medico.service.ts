import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILoginData, IResAuth, IRegistroMedico } from '../models/auth.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { IMedico, IRespMedico } from '../models/medico.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AuthMedicoService {

  private url = environment.urlBase;
  private user = new BehaviorSubject<IMedico>( {} as IMedico );

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
    return this.http.get<IRespMedico>( `${ this.url }/api/medico-profile` ).pipe(
      tap( ( resp ) => this.user.next( resp.data ) )
    );
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

  //! ** Evaluamos el error **
  evalError ( error: HttpErrorResponse ) {

    if ( error.status === HttpStatusCode.InternalServerError ) {
      return throwError( () => 'Algo esta fallando en el servidor' );
    }
    if ( error.status === HttpStatusCode.UnprocessableEntity ) {
      return throwError( () => 'Los password no coinciden' );
    }

    return throwError( () => 'Ups algo salio mal' );
  }
}

