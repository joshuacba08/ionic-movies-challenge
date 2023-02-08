export interface MovieResp{
  ok: boolean;
  data: Movie[]
}

export interface UpdateMovieResp{
  ok: boolean;
  data: Movie;
}

export interface EditMovieReq{
  title:        string;
  overview:     string;
}

export interface VoteReq{
  vote_average: number;
  vote_count:   number;
}



export interface Movie {
  _id:          string;
  title:        string;
  poster_path:  string;
  overview:     string;
  release_date: string;
  vote_average: number;
  vote_count:   number;
  __v:          number;
}
