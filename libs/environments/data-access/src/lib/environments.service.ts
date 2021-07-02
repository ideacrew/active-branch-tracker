import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { YellrUser } from '@idc/user/data-access';
import { filterNullish } from '@idc/util';

import { Org, OrgEnvironment, OwnerReleaseUpdate, OwnerUpdate } from './models';
import { EnvInfo } from './models/envInfo';
import { OtherService } from './models/otherService';

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
        filterNullish(),
        map(org => org.name),
        take(1),
      );
  }

  getEnvironmentDetail({
    orgId,
    envId,
  }: EnvInfo): Observable<OrgEnvironment | undefined> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection<OrgEnvironment>('environments')
      .doc(envId)
      .valueChanges({ idField: 'id' });
  }

  getServices({ orgId, envId }: EnvInfo): Observable<OtherService[]> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection('environments')
      .doc(envId)
      .collection<OtherService>('services')
      .valueChanges({ idField: 'id' }).pipe(
        filterNullish()
      );
  }

  async addService(
    { orgId, envId }: EnvInfo,
    { name, url }: OtherService,
  ): Promise<void> {
    const serviceId = name.toLocaleLowerCase().trim();

    const serviceRef = this.afs.doc<OtherService>(
      `orgs/${orgId}/environments/${envId}/services/${serviceId}`,
    );

    await serviceRef.set({
      name,
      url,
    });
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
  }: OwnerUpdate): Promise<void> {
    const docRef = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await docRef.update({
      owner,
      ownerRelease: firebase.default.firestore.Timestamp.fromDate(ownerRelease),
    });
  }

  getSingleOrg(org: string): Observable<Org | undefined> {
    return this.afs
      .collection<Org>('orgs')
      .doc(org)
      .valueChanges({ idField: 'id' });
  }

  getOrgList(user: YellrUser): Observable<Org[]> {
    if (user.role === 'admin') {
      return this.afs.collection<Org>('orgs').valueChanges({ idField: 'id' });
    } else {
      // Here __name__ is equivalent to the document id
      return this.afs
        .collection<Org>('orgs', ref => ref.where('__name__', 'in', user.orgs))
        .valueChanges({ idField: 'id' });
    }
  }
}
