import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {
  ORIGIN as FUNCTIONS_ORIGIN,
  NEW_ORIGIN_BEHAVIOR,
} from '@angular/fire/functions';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { DisplayConfigModule } from '@idc/display-config';
import { AuthModule } from '@idc/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RootEffects } from './store/root.effects';
import { AppRoutingModule } from './app-routing.module';

// Needed while https://github.com/firebase/firebase-js-sdk/issues/4110 is still a bug
import './firebase-init';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    environment.useEmulators
      ? AngularFireModule.initializeApp(environment.firebase, 'demo-project')
      : AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthGuardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
  providers: [
    // {
    //   provide: USE_FIRESTORE_EMULATOR,
    //   useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    // },
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    // },
    // {
    //   provide: USE_FUNCTIONS_EMULATOR,
    //   useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    // },
    { provide: NEW_ORIGIN_BEHAVIOR, useValue: true },
    {
      provide: FUNCTIONS_ORIGIN,
      useFactory: () => (isDevMode() ? undefined : location.origin),
    },
  ],
})
export class AppModule {}
