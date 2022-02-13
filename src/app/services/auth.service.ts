import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginData, IRegistroPaciente, IResAuth } from '@models/auth.interface';
import { IRespUsuario, IUsuario } from '@models/usuario.interface';
import { tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { UpdateUsuarioDto } from '../models/usuario.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private url = environment.urlBase;
  public user$ = new BehaviorSubject<IUsuario>( {} as IUsuario );

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login ( data: ILoginData ) {
    return this.http.post<IResAuth>( `${ this.url }/api/login/user`, data ).pipe(
      tap( ( resp ) => {
        if ( resp.token ) {
          this.localStorageService.save( resp.token, 'token' );
          this.myProfile();
        }
      } ),
      catchError( ( error: HttpErrorResponse ) => {
        return this.evalError( error );
      } ),
    );
  }


  myProfile () {
    if ( Object.keys( this.user$.value ).length === 0 ) {
      this.http.get<IRespUsuario>( `${ this.url }/api/user-profile` ).pipe(
        tap( ( resp ) => this.user$.next( resp.data ) )
      ).subscribe();
    }
  }

  update ( changes: UpdateUsuarioDto, id: string ) {
    return this.http.put<IRespUsuario>( `${ this.url }/api/usuario/update/${ id }`, changes );
  }

  register ( data: IRegistroPaciente ) {
    return this.http.post<IRespUsuario>( `${ this.url }/api/register/user`, data ).pipe(
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
    return this.http.get<IResAuth>( `${ this.url }/api/logout/user`, { headers } );
  }

  //! ** Evaluamos el error **
  evalError ( error: HttpErrorResponse ) {

    if ( error.status === HttpStatusCode.InternalServerError ) {
      return throwError( () => 'Algo esta fallando en el servidor' );
    }
    if ( error.status === HttpStatusCode.UnprocessableEntity ) {
      return throwError( () => 'Datos ingresados de manera incorrecta' );
    }

    return throwError( () => 'Ups algo salio mal' );
  }
}
