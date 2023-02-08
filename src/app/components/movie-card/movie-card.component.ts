import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../interfaces/movies';
import { MoviesService } from '../../services/movies.service';
import { UiService } from '../../services/ui.service';
import { EditMoviePage } from '../../modals/edit-movie/edit-movie.page';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  stars: string[] =[];

  constructor(private moviesService:MoviesService, private uiService:UiService, private modalController:ModalController
    ) {}

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    this.stars=[];
    const stars = Math.trunc((this.movie.vote_average * 5) / 10);
    const starsHalf = (this.movie.vote_average * 5) / 10 - stars > 0 ? 1 : 0;
    const starsEmpty = stars + starsHalf <= 4 ? 5 - (stars + starsHalf) : 0;
    for (let i = 0; i < stars; i++) {
      this.stars.push('star');
    }
    for (let i = 0; i < starsHalf; i++) {
      this.stars.push('star-half');
    }
    for (let i = 0; i < starsEmpty; i++) {
      this.stars.push('star-outline');
    }
  }


  handleVote(points:number){
    points *= 2;
    const voteMedia = this.movie.vote_average * this.movie.vote_count;
    const vote_average = (voteMedia + points) / (this.movie.vote_count +1)
    const vote_count = this.movie.vote_count + 1;
    const data = {vote_average,vote_count, };

    this.moviesService.sendVote(this.movie._id,data).subscribe(
      resp=>{
        if(resp.ok){
          this.movie.vote_average = vote_average;
          ++this.movie.vote_count;
          this.generateStars();
          this.uiService.presentToast('Your vote was sent correctly',3000, 'success')
        }
      }
    )
  }

  async openModalEdit(){
    const modal = await this.modalController.create({
      component: EditMoviePage,
      componentProps: {
          movie:this.movie
      }
    });
    return await modal.present();
  }
}
