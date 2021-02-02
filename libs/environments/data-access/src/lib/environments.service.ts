import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { DeploymentEnvironment } from '@idc/util';

import { EnvironmentsEntity } from './store/environments.models';

export interface OrgEnvironment {
  id: string;
  name: string;
}

@Injectable()
export class EnvironmentsService {
  constructor(private afs: AngularFirestore) {}

  queryEnvironments(): Observable<EnvironmentsEntity[]> {
    return this.afs
      .collection<DeploymentEnvironment>('environments')
      .valueChanges({ idField: 'id' });
  }

  queryEnvironmentsByOrg(orgName: string): Observable<OrgEnvironment[]> {
    return this.afs
      .collection('orgs')
      .doc(orgName)
      .collection<OrgEnvironment>('environments')
      .valueChanges({ idField: 'id' });
  }
}
