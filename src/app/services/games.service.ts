import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from '../models/games';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  headers = {
    'x-rapidapi-key': env.RapidAPI_KEY,
    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
  };

  localhostUrl = 'https://localhost:7269';

  constructor(private http: HttpClient) { }

  getGamesList(ordering: any, page: any, search: any): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('key', 'ceb6c5861fd94ca191dc9c74dedc79dc').set('page_size', 21).set('page', page);

    if (search)
      params = new HttpParams().set('ordering', ordering).set('search', search).set('key', 'ceb6c5861fd94ca191dc9c74dedc79dc').set('page_size', 21).set('page', page);

    return this.http.get<APIResponse<Game>>(`${env.BASE_GAMES_URL}/games`, {
      params: params,
      headers: this.headers
    });
  }

  getGamesIndexList(ordering: any): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('key', 'ceb6c5861fd94ca191dc9c74dedc79dc').set('page_size', 3);

    return this.http.get<APIResponse<Game>>(`${env.BASE_GAMES_URL}/games`, {
      params: params,
      headers: this.headers
    });
  }

  getHomeFreeToPlay() {
    return this.http.get('https://www.freetogame.com/api/games?limit=3');
  }

  getGamesDetails(id: string): Observable<Game> {
    let params = new HttpParams().set('key', 'ceb6c5861fd94ca191dc9c74dedc79dc');

    const gameInfo = this.http.get(`${env.BASE_GAMES_URL}/games/${id}`, { headers: this.headers, params: params });
    const gameTrailers = this.http.get(`${env.BASE_GAMES_URL}/games/${id}/movies`, { headers: this.headers, params: params });
    const gamePhotos = this.http.get(`${env.BASE_GAMES_URL}/games/${id}/screenshots`, { headers: this.headers, params: params });
    const gamesSeries = this.http.get(`${env.BASE_GAMES_URL}/games/${id}/game-series`, { headers: this.headers, params: params });
    const gamesDlc = this.http.get(`${env.BASE_GAMES_URL}/games/${id}/additions`, { headers: this.headers, params: params });

    return forkJoin({ gameInfo, gameTrailers, gamePhotos, gamesSeries, gamesDlc }).pipe(
      map((response: any) => {
        return {
          ...response['gameInfo'],
          trailers: response['gameTrailers']?.results,
          photos: response['gamePhotos']?.results,
          series: response['gamesSeries']?.results,
          dlc: response['gamesDlc']?.results
        };
      })
    );
  }
}
