import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

// Firebase imports
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  provideAuth,
  initializeAuth,
  connectAuthEmulator,
} from '@angular/fire/auth';
import {
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
  ORIGIN as FUNCTIONS_ORIGIN,
} from '@angular/fire/compat/functions';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

import { DisplayConfigModule } from '@idc/display-config';
import { AuthModule } from '@idc/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RootEffects } from './store/root.effects';
import { AppRoutingModule } from './app-routing.module';

// Needed while https://github.com/firebase/firebase-js-sdk/issues/4110 is still a bug
// import './firebase-init';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
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
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideAuth(() => {
      const auth = initializeAuth(getApp());
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:8080');
      }
      return auth;
    }),
    AngularFireAuthGuardModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
    {
      provide: FUNCTIONS_ORIGIN,
      useFactory: () =>
        isDevMode() || typeof location === 'undefined'
          ? undefined
          : location.origin,
    },
  ],
})
export class AppModule {}
