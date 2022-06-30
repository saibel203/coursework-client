import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APINewResponse, New } from '../models/news';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsListByTitle(title: string): Observable<APINewResponse<New>> {
    let params = new HttpParams().set('api_key', env.NEWS_KEY).set('format', 'json')
      .set('filter', `title:${title}`).set('limit', 10);

    return this.http.get<APINewResponse<New>>(`${env.BASE_NEWS_URL}/articles/`, {
      params: params
    });
  }

  getNewDetails(id: number) {
    let params = new HttpParams().set('api_key', env.NEWS_KEY).set('format', 'json')
      .set('filter', `id:${id}`);

    return this.http.get(`${env.BASE_NEWS_URL}/articles/`, {
      params: params
    });
  }

  getIndexNews() {
    let now = new Date();
    let past = new Date(now);
    past.setDate(past.getDate() - 1);


    let params = new HttpParams().set('api_key', env.NEWS_KEY).set('format', 'json').set('limit', 3)
      .set('filter', `release_date:${past.toISOString().substring(0, 10)}`);

    return this.http.get(`${env.BASE_NEWS_URL}/games/`, {
      params: params
    });
  }
}
