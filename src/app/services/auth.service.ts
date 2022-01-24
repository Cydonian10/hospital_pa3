import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginData, IResAuth } from '@models/auth.interface';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private url = environment.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  login ( data: ILoginData ) {
    return this.http.post<IResAuth>( `${ this.url }/api/login`, data ).pipe(
      tap( ( resp ) => {
        console.log( resp );
        // this.localStorageService.save( resp.acces_token, 'token' );
        // this.myProfile().subscribe();
      } ),
      catchError( ( error: HttpErrorResponse ) => {
        return this.evalError( error );
      } ),
    );
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
