// Work around for https://github.com/firebase/firebase-js-sdk/issues/4110
// console.log('Initializing Firebase App');
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import { environment } from '../environments/environment';

const app = firebase.initializeApp(environment.firebase, 'demo-project');
app.auth().useEmulator('http://localhost:9099');
app.firestore().useEmulator('localhost', 8080);
app.functions().useEmulator('localhost', 5001);
