import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiW1RxJAs5fiOOjLDjHUKSvv9NYCOph6I',
      libraries: ['geometry', 'places']
    }),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
