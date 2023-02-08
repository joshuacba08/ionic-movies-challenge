import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResp, UpdateMovieResp, VoteReq, EditMovieReq } from '../../interfaces/movies';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private newMoviesInfoSubject = new BehaviorSubject<any>(null);
  newMoviesInfo$: Observable<any> = this.newMoviesInfoSubject.asObservable();

  constructor(private httpClient:HttpClient) { }

  getAllMovies(){
    return this.httpClient.get<MovieResp>(`${environment.endpointServer}/movie`)
  }

  sendVote(movieId:string,data: VoteReq){
    return this.httpClient.patch<UpdateMovieResp>(`${environment.endpointServer}/movie/${movieId}`, data)
  }

  updateMovie(movieId:string,data: EditMovieReq){
    return this.httpClient.patch<UpdateMovieResp>(`${environment.endpointServer}/movie/${movieId}`, data)
  }

  loadMovies(){
    this.newMoviesInfoSubject.next(true);
  }

}
