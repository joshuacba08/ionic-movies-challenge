import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from '../../../interfaces/movies';
import { MoviesService } from '../../services/movies.service';
import { UiService } from '../../services/ui.service';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit, OnDestroy {
  @Input() movie: Movie;
  editMovieSubscription$: Subscription;
  movieForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    overview: ['', [Validators.required]],
  });

  constructor(
    private modalController: ModalController,
    private uiService: UiService,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    if (this.movie) {
      this.movieForm.get('title')?.setValue(this.movie.title);
      this.movieForm.get('overview')?.setValue(this.movie.overview);
    }
  }

  onSubmit() {
    if (this.movieForm.status === 'VALID') {
      this.editMovieSubscription$ = this.moviesService
        .updateMovie(this.movie._id, this.movieForm.value)
        .subscribe({
          next: (resp) => {
            if (resp.ok) {
              this.moviesService.loadMovies();
              this.modalController.dismiss();
              this.uiService.presentToast(
                'The film was edited satisfactorily',
                3000,
                'success'
              );
            }
          },
          error: (error) => {
            this.uiService.presentToast(`${error.message}`, 3000, 'danger');
          },
        });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    if( this.editMovieSubscription$){
      this.editMovieSubscription$.unsubscribe();
    }
  }
}
