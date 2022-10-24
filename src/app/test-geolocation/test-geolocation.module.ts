import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IonicModule } from '@ionic/angular';

import { TestGeolocationPage } from './test-geolocation.page';

const routes: Routes = [
  {
    path: '',
    component: TestGeolocationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestGeolocationPage],
  providers: [
    BackgroundGeolocation,
    Geolocation,
    BackgroundMode,
    LocalNotifications]
})
export class TestGeolocationPageModule {}
