import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMoviePageRoutingModule } from './detail-movie-routing.module';

import { DetailMoviePage } from './detail-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMoviePageRoutingModule
  ],
  declarations: [DetailMoviePage]
})
export class DetailMoviePageModule {}
