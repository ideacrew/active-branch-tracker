import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStream = new Subject<void>();
  authStream$ = this.authStream.asObservable();

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
    return this.afAuth.user.pipe(tap(console.log));
  }
}
