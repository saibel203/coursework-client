import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIEsportResponse, Esport, UpcomingTournaments } from '../models/esport';

@Injectable({
    providedIn: 'root'
})
export class EsportService {

    headers = new HttpHeaders().set('Authorization', 'Bearer 9IjiiZO-lbqMQilTpSy04oE5gFX7xDobzq8Wch4JecIhhxhXdVA');

    constructor(private http: HttpClient) { }

    listLiveMatches(): Observable<APIEsportResponse<Esport>> {
        let params = new HttpParams().set('page', '1').set('per_page', '3');

        return this.http.get<APIEsportResponse<Esport>>(`${env.ESPORT_URL}/lives`, {
            params: params,
            headers: this.headers
        });
    }

    getHomeUpcomingTournaments(): Observable<APIEsportResponse<UpcomingTournaments>> {
        let params = new HttpParams().set('page', '1').set('per_page', '2');

        return this.http.get<APIEsportResponse<UpcomingTournaments>>(`${env.ESPORT_URL}/tournaments/upcoming`, {
            params: params,
            headers: this.headers
        });
    }

    getUpcomingTournaments(): Observable<APIEsportResponse<UpcomingTournaments>> {
        let params = new HttpParams().set('per_page', '6');

        return this.http.get<APIEsportResponse<UpcomingTournaments>>(`${env.ESPORT_URL}/tournaments/upcoming`, {
            params: params,
            headers: this.headers
        });
    }

    getTournamentDetails(id: string): Observable<APIEsportResponse<any>> {
        return this.http.get<APIEsportResponse<any>>(`${env.ESPORT_URL}/tournaments/${id}`, {
            headers: this.headers
        });
    }
}
