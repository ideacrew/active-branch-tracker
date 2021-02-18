import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
export type AppName = 'enroll' | 'gluedb';
export type DataRefreshStatus = 'started' | 'completed' | 'error';
export interface AppData {
  status: DataRefreshStatus;
  user_name: string;
  dataTimestamp: firebase.default.firestore.Timestamp;
}

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
  latestDeployment: LatestDeployment;
  owner: string;
  ownerRelease: firebase.default.firestore.Timestamp;
  gluedb?: AppData;
  enroll?: AppData;
}

export interface OwnerUpdate {
  orgId: string;
  envId: string;
  owner: string;
}
export interface OwnerReleaseUpdate {
  orgId: string;
  envId: string;
  ownerRelease: Date;
}

export interface LatestDeployment {
  app: string;
  branch: string;
  commit_sha: string;
  completed?: firebase.default.firestore.Timestamp;
  env: string;
  org: string;
  repo: string;
  started?: firebase.default.firestore.Timestamp;
  status: 'started' | 'completed';
  user_name: string;
}

export type Architecture = 'standalone' | 'e2e';
export interface Org {
  name: string;
}

@Injectable()
export class EnvironmentsService {
  constructor(private afs: AngularFirestore) {}

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

  getEnvironmentDetail({ orgId, envId }): Observable<OrgEnvironment> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection<OrgEnvironment>('environments')
      .doc(envId)
      .valueChanges({ idField: 'id' });
  }

  async updateEnvironmentOwner({
    orgId,
    envId,
    owner,
  }: OwnerUpdate): Promise<void> {
    const docRef = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await docRef.update({ owner });
  }

  async updateEnvironmentReleaseDate({
    orgId,
    envId,
    ownerRelease,
  }: OwnerReleaseUpdate): Promise<void> {
    const docRef = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await docRef.update({
      ownerRelease: firebase.default.firestore.Timestamp.fromDate(ownerRelease),
    });
  }

  async updateOwnerInformation({
    orgId,
    envId,
    owner,
    ownerRelease,
  }): Promise<void> {
    const docRef = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await docRef.update({
      owner,
      ownerRelease: firebase.default.firestore.Timestamp.fromDate(ownerRelease),
    });
  }
}
