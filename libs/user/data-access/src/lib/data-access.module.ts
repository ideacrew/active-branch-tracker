import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [CommonModule, AngularFirestoreModule],
})
export class UserDataAccessModule {}
