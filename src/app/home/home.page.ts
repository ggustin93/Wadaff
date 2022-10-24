/// <reference types="@types/googlemaps" />
import { ModalController, Platform } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import agm_style from '../../assets/data/agmstyle.json';
import { AddEventModalPage } from '../add-event-modal/add-event-modal.page';
import { EventCrudService } from '../services/event-crud.service';
import { PopupService } from '../services/popup.service';
import { BackgroundGeolocationService } from '../services/background-geolocation.service';
// import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})


export class HomePage implements OnInit {

  dataReturned: any;
  title: string = 'AGM project';
  events_view: string;
  header_view: boolean;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  geoCoder;
  autocomplete: any;
  events: any;

  //@ViewChild('search',{static: true}) search: any;

  lat: number = 51.678418;
  lng: number = 7.809007;
  agm_style;
  height = 0;

  constructor(
    private eventCrudService: EventCrudService,
    public modalController: ModalController,
    public platform: Platform,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private popup: PopupService,
    private geolocationService: BackgroundGeolocationService,
  ) {
    console.log(platform.height()); // TODO: remove this debug statement
    this.height = platform.height() + 56;
    this.agm_style = agm_style;
  }

  ngOnInit() {

    this.events_view = 'map';
    this.header_view = false;


    this.eventCrudService.read_events().subscribe(data => {

      this.events = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['d']['title'],
          score: e.payload.doc.data()['d']['score'],
          address: e.payload.doc.data()['d']['address'],
          g: e.payload.doc.data()['g'],
          lat: e.payload.doc.data()['l']['_lat'],
          lg: e.payload.doc.data()['l']['_long'],
        };
      });
      console.log('Events:', this.events);

    });
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      /* this.autocomplete = new google.maps.places.Autocomplete(this.autocomplete);

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      }); */


    });
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: AddEventModalPage,
      componentProps: {
        lat: this.latitude,
        lg: this.longitude,
        address: this.address
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return modal.present();
  }


  addEvent() {
    this.openModal();
  }


  filter() {
    this.header_view = !this.header_view;
  }


  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);

        const loc = {
          timestamp: new Date(),
          speed: 0,
          lat: position.coords.latitude,
          long:  position.coords.longitude,
        };
        this.geolocationService.add_location(loc, '3');
      });

    }

  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.popup.error('No results found');
        }
      } else {
        this.popup.error('Geocoder failed due to: ' + status);
      }

    });
  }

}
