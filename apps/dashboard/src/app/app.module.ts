import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'branches', pathMatch: 'full' },
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
    ]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
