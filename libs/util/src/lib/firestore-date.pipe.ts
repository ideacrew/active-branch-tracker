import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase/compat/app';

@Pipe({
  name: 'firestoreDate',
})
export class FirestoreDatePipe implements PipeTransform {
  transform(d: firebase.default.firestore.Timestamp): Date {
    return d.toDate();
  }
}
