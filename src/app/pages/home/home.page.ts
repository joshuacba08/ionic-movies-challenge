import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, Observable } from 'rxjs';
import { Movie } from 'src/interfaces/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  movies$: Observable<Movie[]>;
  folder!: string;

  constructor(private activatedRoute: ActivatedRoute, private moviesService:MoviesService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getMovies()
  }


  getMovies(){
    this.movies$ = this.moviesService.getAllMovies().pipe( map( resp => resp.data ));
  }
}
