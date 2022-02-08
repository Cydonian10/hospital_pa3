import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthService } from '@services/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.myProfile();
  }

  redirec ( flag: boolean ) {
    if ( !flag ) {
      this.router.navigateByUrl( "/auth/login" );
    }
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.localStorageService.get( 'token' ) ? true : false;

    if ( !this.authService.user$ ) {
      this.router.navigateByUrl( "/auth/login" );
    }

    // this.authService.myProfile().subscribe( {
    //   next: ( resp ) => { this.authService.user$.next( resp ); },
    //   error: () => this.router.navigateByUrl( "/auth/login" )
    // } );


    this.redirec( token );
    return token;
  }
  canLoad (
    route: Route,
    segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.localStorageService.get( 'token' ) ? true : false;

    if ( !this.authService.user$ ) {
      this.router.navigateByUrl( "/auth/login" );
    }

    // this.authService.myProfile().subscribe( {
    //   next: ( resp ) => { this.authService.user$.next( resp ); },
    //   error: () => this.router.navigateByUrl( "/auth/login" )
    // } );


    this.redirec( token );
    return token;
  }
}
