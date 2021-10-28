import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@idc/user/data-access';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrgAccessGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userService.user$.pipe(
      map(user => {
        const orgId = route.paramMap.get('orgId');

        if (user !== undefined && orgId !== null) {
          return user.orgs.includes(orgId) || user.role === 'admin';
        } else {
          return false;
        }
      }),
      tap(allowedAccess => {
        if (!allowedAccess) {
          void this.router.navigate(['/environments']);
        }
      }),
    );
  }
}
