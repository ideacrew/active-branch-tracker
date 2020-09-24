import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  async login(): Promise<void> {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  get user$(): Observable<User | null> {
    return this.afAuth.user;
  }
}
