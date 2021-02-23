import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '@idc/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOnlyGuard implements CanActivate, CanLoad {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.canAccess();
  }

  canLoad(): Observable<boolean> {
    return this.canAccess();
  }

  canAccess(): Observable<boolean> {
    console.log('Running canAccess method');

    return this.authService.user$.pipe(
      switchMap(user => {
        if (user === undefined || user === null) {
          return of(false);
        } else {
          return this.userService.user$.pipe(
            map(user => user?.role === 'admin'),
          );
        }
      }),
      tap(access => {
        if (!access) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
