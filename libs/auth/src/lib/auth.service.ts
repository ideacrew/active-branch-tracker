import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  login(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(): void {
    this.afAuth.signOut();
  }

  get user$(): Observable<User | null> {
    return this.afAuth.user;
  }
}
