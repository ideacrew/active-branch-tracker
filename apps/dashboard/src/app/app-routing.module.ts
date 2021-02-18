import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@idc/auth';
import { AppShellComponent } from './app-shell/app-shell.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'branches',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
