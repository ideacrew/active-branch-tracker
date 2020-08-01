import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BranchListService } from './branch-list.service';

@NgModule({
  imports: [CommonModule, AngularFirestoreModule],
  providers: [BranchListService],
})
export class BranchesDataAccessModule {}
