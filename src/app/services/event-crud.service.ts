import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../../environments/environment';

if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebaseConfig);
}
// Create a Firestore reference
const firestore = firebase.firestore();
// Create a GeoFirestore reference
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
// Create a GeoCollection reference
const geocollection: GeoCollectionReference = geofirestore.collection('events');

@Injectable({
  providedIn: 'root'
})
export class EventCrudService {

  constructor(
    private afs: AngularFirestore
  ) { }

  read_events() {
    return this.afs.collection('events').snapshotChanges();
  }

  add_event(e) {
    geocollection.add({
      title: e.title,
      score: e.score,
      address: e.address,
      coordinates: new firebase.firestore.GeoPoint(e.lat, e.long)
    });
  }
}
