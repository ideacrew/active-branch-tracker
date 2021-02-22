import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOnlyGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.canAccess();
  }

  canLoad(): Observable<boolean> {
    return this.canAccess();
  }

  canAccess(): Observable<boolean> {
    return this.userService.user$.pipe(
      map(user => user?.role === 'admin'),
      tap(canAccess => {
        if (!canAccess) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
