import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthService } from '../../services/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  redirect ( flag: boolean ) {
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

    this.redirect( token );
    return true;
  }
  canLoad (
    route: Route,
    segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    return true;
  }
}
