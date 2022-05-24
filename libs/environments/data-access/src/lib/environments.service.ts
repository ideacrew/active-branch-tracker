import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';

import { YellrUser } from '@idc/user/data-access';
import { filterNullish } from '@idc/util';

import {
  Org,
  OrgEnvironment,
  OwnerReleaseUpdate,
  OwnerUpdate,
  ServiceInfo,
  EnvironmentInfo,
  EnvironmentService,
  FSServiceDeployment,
  EnvironmentVariable,
  EnvironmentVariableDict,
} from './models';

interface EnvironmentIdentifier {
  orgId: string;
  envId: string;
}

@Injectable()
export class EnvironmentsService {
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
  ) {}

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
        map((org: Org) => org.name),
        take(1),
      );
  }

  getEnvironmentDetail({
    orgId,
    envId,
  }: EnvironmentInfo): Observable<OrgEnvironment | undefined> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection<OrgEnvironment>('environments')
      .doc(envId)
      .valueChanges({ idField: 'id' });
  }

  getServices({
    orgId,
    envId,
  }: EnvironmentInfo): Observable<EnvironmentService[]> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection('environments')
      .doc(envId)
      .collection<EnvironmentService>('services')
      .valueChanges({ idField: 'id' })
      .pipe(filterNullish());
  }

  getEnvironmentVariables({
    orgId,
    envId,
  }: EnvironmentIdentifier): Observable<EnvironmentVariableDict> {
    const callable = this.fns.httpsCallable<
      EnvironmentIdentifier,
      EnvironmentVariableDict
    >('getEnvironmentVariables');

    const environmentVariables$: Observable<EnvironmentVariableDict> = callable(
      {
        orgId,
        envId,
      },
    );

    return environmentVariables$;
  }

  getService({
    orgId,
    envId,
    serviceId,
  }: ServiceInfo): Observable<EnvironmentService> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection('environments')
      .doc(envId)
      .collection<EnvironmentService>('services')
      .doc(serviceId)
      .valueChanges({ idField: 'id' })
      .pipe(filterNullish());
  }

  async updateService(
    serviceInfo: ServiceInfo,
    { name, url }: { name: string; url: string },
  ): Promise<void> {
    const { orgId, envId, serviceId } = serviceInfo;

    const serviceReference = this.afs
      .collection('orgs')
      .doc(orgId)
      .collection('environments')
      .doc(envId)
      .collection<EnvironmentService>('services')
      .doc(serviceId);

    await serviceReference.update({ name, url });
  }

  async updateEnvironmentOwner({
    orgId,
    envId,
    owner,
  }: OwnerUpdate): Promise<void> {
    const documentReference = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await documentReference.update({ owner });
  }

  async updateEnvironmentReleaseDate({
    orgId,
    envId,
    ownerRelease,
  }: OwnerReleaseUpdate): Promise<void> {
    const documentReference = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await documentReference.update({
      ownerRelease: firebase.default.firestore.Timestamp.fromDate(ownerRelease),
    });
  }

  async updateOwnerInformation({
    orgId,
    envId,
    owner,
    ownerRelease,
  }: OwnerUpdate): Promise<void> {
    const documentReference = this.afs.doc<OrgEnvironment>(
      `orgs/${orgId}/environments/${envId}`,
    );

    await documentReference.update({
      owner,
      ownerRelease: firebase.default.firestore.Timestamp.fromDate(ownerRelease),
    });
  }

  getDeploymentHistory({
    orgId,
    envId,
    serviceId,
  }: ServiceInfo): Observable<FSServiceDeployment[]> {
    return this.afs
      .collection('orgs')
      .doc(orgId)
      .collection('environments')
      .doc(envId)
      .collection('services')
      .doc(serviceId)
      .collection<FSServiceDeployment>('deployments', reference =>
        reference.orderBy('completed', 'desc').limit(10),
      )
      .valueChanges({ idField: 'id' });
  }

  getSingleOrg(org: string): Observable<Org | undefined> {
    return this.afs
      .collection<Org>('orgs')
      .doc(org)
      .valueChanges({ idField: 'id' });
  }

  getOrgList(user: YellrUser): Observable<Org[]> {
    return user.role === 'admin'
      ? this.afs.collection<Org>('orgs').valueChanges({ idField: 'id' })
      : this.afs
          .collection<Org>('orgs', reference =>
            reference.where('__name__', 'in', user.orgs),
          )
          .valueChanges({ idField: 'id' });
  }
}
