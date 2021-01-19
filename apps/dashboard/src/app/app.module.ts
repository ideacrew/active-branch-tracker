import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
  // SETTINGS as FIRESTORE_SETTINGS,
} from '@angular/fire/firestore';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
  ORIGIN as FUNCTIONS_ORIGIN,
  NEW_ORIGIN_BEHAVIOR,
} from '@angular/fire/functions';

import { DisplayConfigModule } from '@idc/display-config';
import { AuthModule, LoginComponent } from '@idc/auth';
import { UserDataAccessModule } from '@idc/user/data-access';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RootEffects } from './store/root.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDsNXuItZFPCzfTSjcEKDvXy2xA4sd-Tgs',
      authDomain: 'active-branches-report.firebaseapp.com',
      databaseURL: 'https://active-branches-report.firebaseio.com',
      projectId: 'active-branches-report',
      storageBucket: 'active-branches-report.appspot.com',
      messagingSenderId: '633810997367',
      appId: '1:633810997367:web:931c5bc156a5e71d097672',
      measurementId: 'G-WV4T2RGHM3',
    }),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule.forRoot(
      [
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
          loadChildren: () =>
            import('@idc/environments/feature').then(
              module => module.EnvironmentsFeatureModule,
            ),
        },
        {
          path: 'user',
          loadChildren: () =>
            import('@idc/user/feature').then(
              module => module.UserFeatureModule,
            ),
        },
      ],
      { relativeLinkResolution: 'legacy' },
    ),
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([RootEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    DisplayConfigModule,
    AngularFirestoreModule,
    AuthModule,
    UserDataAccessModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
    { provide: NEW_ORIGIN_BEHAVIOR, useValue: true },
    {
      provide: FUNCTIONS_ORIGIN,
      useFactory: () => (isDevMode() ? undefined : location.origin),
    },
  ],
})
export class AppModule {}
