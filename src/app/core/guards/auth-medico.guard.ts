import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthMedicoService } from '@services/auth-medico.service';
import { LocalStorageService } from '@services/local-storage.service';
import { Observable, Subscription } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class AuthMedicoGuard implements CanActivate, CanLoad, OnDestroy {

  subscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthMedicoService,
    private router: Router
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  redirect ( flag: boolean ) {
    if ( !flag ) {
      this.router.navigateByUrl( "/auth/login-medico" );
    }
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.localStorageService.get( 'token' ) ? true : false;

    this.subscription.add(
      this.authService.myProfile().subscribe( {
        next: ( resp ) => { this.authService.medico$.next( resp ); },
        error: () => this.router.navigateByUrl( "/auth/login-medico" )
      } )
    );

    this.redirect( token );
    return token;
  }
  canLoad (
    route: Route,
    segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.localStorageService.get( 'token' ) ? true : false;

    // if ( Object.keys( this.authService.medico$.value ).length === 0 ) {
    //   this.authService.myProfile().subscribe( {
    //     next: ( resp ) => { this.authService.medico$.next( resp.data ); },
    //     error: () => this.router.navigateByUrl( "/auth/login-medico" )
    //   } );
    // }
    this.redirect( token );
    return token;
  }
}
