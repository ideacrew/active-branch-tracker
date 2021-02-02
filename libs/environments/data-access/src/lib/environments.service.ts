import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { DeploymentEnvironment } from '@idc/util';

import { EnvironmentsEntity } from './store/environments.models';
import { map, take } from 'rxjs/operators';

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
}

export type Architecture = 'standalone' | 'e2e';
export interface Org {
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

  getOrgName(orgName: string): Observable<string> {
    return this.afs
      .collection('orgs')
      .doc<Org>(orgName)
      .valueChanges()
      .pipe(
        map(org => org.name),
        take(1),
      );
  }
}
