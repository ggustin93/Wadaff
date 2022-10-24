import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StarRatingModule } from 'ionic4-star-rating';
import { IonicModule } from '@ionic/angular';

import { AddEventModalPage } from './add-event-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddEventModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEventModalPage]
})
export class AddEventModalPageModule {}
