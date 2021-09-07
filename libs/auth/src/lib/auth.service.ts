import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

import { filterNullish } from '@idc/util';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  login(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async loginWithEmailPassword(
    email: string,
    password: string,
  ): Promise<void | firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  get user$(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }

  get alwaysUser$(): Observable<firebase.User> {
    return this.afAuth.user.pipe(filterNullish());
  }
}
