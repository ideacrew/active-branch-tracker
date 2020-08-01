import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DeploymentEnvironment } from '@idc/util';

import { EnvironmentsEntity } from './store/environments.models';

@Injectable()
export class EnvironmentsService {
  constructor(private afs: AngularFirestore) {
    console.log('Hello from environments service')
  }

  queryEnvironments(): Observable<EnvironmentsEntity[]> {
    return this.afs
      .collection<DeploymentEnvironment>('environments')
      .valueChanges({ idField: 'id' })
      .pipe(tap(console.log));
  }
}
