import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
  latestDeployment: BranchDeployment;
  owner: string;
  ownerRelease?: firebase.default.firestore.Timestamp;
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

export interface BranchDeployment {
  branch: string;
  env: string;
  app: string;
  user_name: string;
  commit_sha: string;
  org: string;
  repo: string;
  deployedAt: unknown;
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
}
