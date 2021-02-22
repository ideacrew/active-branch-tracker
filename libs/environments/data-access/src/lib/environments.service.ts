import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { Org, OrgEnvironment, OwnerReleaseUpdate, OwnerUpdate } from './models';

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

  getSingleOrg(org: string): Observable<Org> {
    return this.afs
      .collection<Org>('orgs')
      .doc(org)
      .valueChanges({ idField: 'id' });
  }

  getOrgList(): Observable<Org[]> {
    return this.afs.collection<Org>('orgs').valueChanges({ idField: 'id' });
  }
}
