import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStream = new Subject<void>();
  authStream$ = this.authStream.asObservable();

  constructor(public afAuth: AngularFireAuth) {}

  async login(): Promise<void> {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      console.log('AUTH ERROR', e);
      throw new Error('Error!')
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  get user$(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }
}
