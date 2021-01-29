import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@idc/auth';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes = [
  { path: '', redirectTo: 'branches', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'branches',
    loadChildren: () =>
      import('@idc/branches/feature').then(m => m.BranchesFeatureModule),
  },
  {
    path: 'branches/:branchId',
    loadChildren: () =>
      import('@idc/branches/feature').then(m => m.BranchDetailModule),
  },
  {
    path: 'environments',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('@idc/environments/feature').then(
        module => module.EnvironmentsFeatureModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
