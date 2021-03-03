import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@idc/user/data-access';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrgAccessGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.user$.pipe(
      map(user => {
        const orgId = route.paramMap.get('orgId');

        return user.orgs.includes(orgId) || user.role === 'admin';
      }),
      tap(allowedAccess => {
        if (!allowedAccess) {
          this.router.navigate(['/environments']);
        }
      }),
    );
  }
}
