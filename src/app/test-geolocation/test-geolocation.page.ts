import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";
import { BackgroundGeolocationService } from '../services/background-geolocation.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-test-geolocation',
  templateUrl: './test-geolocation.page.html',
  styleUrls: ['./test-geolocation.page.scss'],
})
export class TestGeolocationPage implements OnInit {
  notificationAlreadyReceived = false;
  originalCoords;
  location: any;
  timestamp: any;
  locations1: any;
  locations2: any;
  locations3: any;
  mail: string;
  plugin1_enabled = false;
  plugin2_enabled = false;
  TIME_INTERVAL = 120000; // Every two minutes

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private backgroundService: BackgroundGeolocationService,
    public backgroundMode: BackgroundMode,
    public platform: Platform,
    public geolocation: Geolocation,
    public localNotifications: LocalNotifications,
    private authService: AuthService
  ) {

    this.mail = this.authService.userDetails().email;
    platform.ready().then(() => {

      // Test Plugin 1
      this.startBackgroundGeolocation();

      // Test Plugin 2 
      this.backgroundMode.enable();
      this.plugin2_enabled = this.backgroundMode.isEnabled();
      this.backgroundMode.on('activate').subscribe(() => {

        console.log('Plugin 2: Background mode activated', this.plugin2_enabled);
        // Every 30 seconds
        setInterval(this.trackPosition, this.TIME_INTERVAL);
        if (this.notificationAlreadyReceived === false) {
          this.showNotification();
        }
        // }
      });
    });
  }



  ngOnInit() {
    // TEST PLUGIN 1
    this.backgroundService.read_locations(1).subscribe(data => {
      this.locations1 = data.map(e => {
        return {
          ts: e.payload.doc.data()['d']['timestamp'],
          lat: e.payload.doc.data()['l']['_lat'],
          lg: e.payload.doc.data()['l']['_long'],
          mail: e.payload.doc.data()['d']['mail'],
        };
      })
      console.log("Locations1:", this.locations1);

    });

    // TEST PLUGIN 2
    this.backgroundService.read_locations(2).subscribe(data => {
      this.locations2 = data.map(e => {
        return {
          ts: e.payload.doc.data()['d']['timestamp'],
          lat: e.payload.doc.data()['l']['_lat'],
          lg: e.payload.doc.data()['l']['_long'],
          mail: e.payload.doc.data()['d']['mail'],
        };
      })
      console.log("Locations2:", this.locations2);
    });

    // TEST PLUGIN 3
    this.backgroundService.read_locations(3).subscribe(data => {
      this.locations3 = data.map(e => {
        return {
          ts: e.payload.doc.data()['d']['timestamp'],
          lat: e.payload.doc.data()['l']['_lat'],
          lg: e.payload.doc.data()['l']['_long'],
          mail: e.payload.doc.data()['d']['mail'],
        };
      })
      console.log("Locations3:", this.locations3);
    });
  }

  trackPosition = () => {
    console.log("In trackPosition");
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        this.handleMovement(position.coords);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  handleMovement = (coords) => {
    console.log("In handleMovement");
    let loc = {
      timestamp: new Date(),
      speed: 0,
      lat: this.originalCoords.latitude,
      long: this.originalCoords.longitude,
    }
    this.backgroundService.add_location(loc, 2);
    this.showNotification();
  };


  showNotification() {
    console.log("In show Notification")
    this.localNotifications.schedule({
      text: 'There is a Wadaff event near you :-) Wanna join ?',
      id: 1,
      trigger: { at: new Date(new Date().getTime() + 1000) },
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    });
    this.notificationAlreadyReceived = true;
  }

  startBackgroundGeolocation() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 2,
      stationaryRadius: 2,
      distanceFilter: 5,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false,// enable this to clear background location settings when the app terminates
      notificationTitle: 'Wadaff tracking',
      notificationText: 'enabled',
      interval: this.TIME_INTERVAL,
      fastestInterval: 5000,
      activitiesInterval: 10000,
    };

    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.sendGPS(location);
          this.backgroundGeolocation.finish();
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        });
    });

    // start recording location
    this.backgroundGeolocation.start();
    this.plugin1_enabled = true;

  }

  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
    this.plugin1_enabled = false;

  }

  sendGPS(location) {
    console.log("In sendGPS(location)", location)
    if (location.speed == undefined) {
      location.speed = 0;
    }
    this.timestamp = new Date(location.time);

    this.location = {
      timestamp: this.timestamp,
      speed: location.speed,
      lat: location.latitude,
      long: location.longitude
    };

    this.backgroundService.add_location(this.location, 1);

    // FOR IOS ONLY
    // this.backgroundGeolocation.finish(); 
  }
}

