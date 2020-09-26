import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserEntity } from './store/user.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {}

  login(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  get user$(): Observable<User | null> {
    return this.afAuth.user;
  }

  getUserRef(user: firebase.User): Observable<UserEntity | undefined> {
    return this.afs.doc<UserEntity>(`users/${user.uid}`).valueChanges();
  }
}
