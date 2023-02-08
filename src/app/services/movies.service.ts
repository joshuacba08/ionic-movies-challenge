import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResp, UpdateMovieResp, VoteReq } from '../../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient:HttpClient) { }

  getAllMovies(){
    return this.httpClient.get<MovieResp>(`${environment.endpointServer}/movie`)
  }

  sendVote(movieId:string,data: VoteReq){
    return this.httpClient.patch<UpdateMovieResp>(`${environment.endpointServer}/movie/${movieId}/vote`, data)
  }

}
