import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@idc/auth';
import { AdminOnlyGuard } from '@idc/user/data-access';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
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
    path: 'pull-requests',
    canLoad: [AdminOnlyGuard],
    loadChildren: () =>
      import('@idc/pull-requests/feature').then(
        m => m.PullRequestsFeatureModule,
      ),
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
    path: 'authors',
    loadChildren: () =>
      import('@idc/authors/feature').then(m => m.AuthorsFeatureModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
