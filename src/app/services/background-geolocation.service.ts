import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { strictEqual } from 'assert';

if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebaseConfig);
}// Create a Firestore reference
const firestore = firebase.firestore();
// Create a GeoFirestore reference
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
// Create a GeoCollection reference
// const geocollection: GeoCollectionReference = geofirestore.collection('locations1');


@Injectable({
  providedIn: 'root'
})
export class BackgroundGeolocationService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  add_location(loc,plugin) {
    let mail_id = this.authService.userDetails().email;
    console.log("In add_location!",loc,plugin);
    if(plugin == 1){ 
      var geocollection: GeoCollectionReference = geofirestore.collection('locations1');
    }
    if(plugin == 2){
      var geocollection: GeoCollectionReference = geofirestore.collection('locations2');
    }else{
      var geocollection: GeoCollectionReference = geofirestore.collection('locations3');
    }

    geocollection.add({
      timestamp: loc.timestamp,
      speed: loc.speed || 0,
      coordinates: new firebase.firestore.GeoPoint(loc.lat, loc.long),
      mail: mail_id 
    }).then(
      data => {
        console.log("Added location: ",data);
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }


  read_locations(plugin) {
    let ref = 'locations' + plugin;
    return this.afs.collection(ref).snapshotChanges();
  }

}
