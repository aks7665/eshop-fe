import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, withLatestFrom, first } from 'rxjs/operators';
import { isLoggedIn, selectUser, isLoggedOut } from '../store/auth/auth.selectors';
import { AppState } from '../store';

@Injectable()
export class BuyerGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        withLatestFrom(this.store.pipe(select(selectUser))), // New Added
        tap(([loggedIn, user]) => {
          if (!loggedIn) {
            this.router.navigate(['login']);
          } else {
            if (user.role === 'admin') {
              this.router.navigate(['admin']);
            }
          }
        }),
        first(),
        pipe(select(isLoggedOut))
      );
  }
}
