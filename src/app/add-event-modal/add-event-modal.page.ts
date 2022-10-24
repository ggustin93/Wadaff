import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/firestore';
import { EventCrudService } from '../services/event-crud.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {
  title: string;
  score: number;
  latitude: any;
  longitude: any;
  address: string;

  constructor(
    private modalController: ModalController,
    private eventCrudService: EventCrudService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.latitude = this.navParams.data.lat;
    this.longitude = this.navParams.data.lg;
    this.address = this.navParams.data.address;
    this.score = this.navParams.data.score;
  }

  logRatingChange(rating) {
    this.score = rating;
    // console.log("changed rating: ",rating);
    // do your stuff
  }

  async closeModal() {
    const onClosedData: string = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  addEvent() {
      // Add a GeoDocument to a GeoCollection
      const e = {
        title: this.title,
        score: this.score,
        address: this.address,
        lat: this.latitude,
        long: this.longitude
      };
      this.eventCrudService.add_event(e);
      this.closeModal();
    }
}
