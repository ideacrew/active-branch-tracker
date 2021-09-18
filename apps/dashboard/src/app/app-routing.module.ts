import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@idc/auth';
import { AdminOnlyGuard } from '@idc/user/data-access';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'branches',
    canLoad: [AdminOnlyGuard],
    loadChildren: () =>
      import('@idc/branches/feature').then(m => m.BranchesFeatureModule),
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
  {
    path: 'cucumbers',
    loadChildren: () =>
      import('@idc/cucumbers').then(module => module.CucumbersModule),
  },
  {
    path: 'rspecs',
    loadChildren: () =>
      import('@idc/rspecs').then(module => module.RspecsModule),
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
