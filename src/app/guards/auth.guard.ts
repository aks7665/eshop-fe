import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, withLatestFrom, filter, first, map } from 'rxjs/operators';
import {
  isLoggedOut,
  isLoggedIn,
  selectUser,
} from '../store/auth/auth.selectors';
import { AppState } from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedOut),
      withLatestFrom(this.store.pipe(select(selectUser))), // New Added
      tap(([loggedOut, user]) => {
        if (user) {
          if (!loggedOut) {
            if (user.role === 'admin') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['buyer']);
            }
          }
        }
      }),
      pipe(select(isLoggedOut))
    );
  }
}
