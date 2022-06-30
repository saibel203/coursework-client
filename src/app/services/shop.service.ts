import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIShopResponse, Shop } from '../models/shop';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private http: HttpClient) { }

    getSteamListGames(): Observable<APIShopResponse<Shop>> {
        let params = new HttpParams().set('page', '1').set('limit', '5').set('currency', 'USD');

        return this.http.get<APIShopResponse<Shop>>(`${env.SHOP_URL}/steam/specials`, {
            params: params,
            headers: {
                'X-RapidAPI-Key': 'fd3f2b161cmshab4c0046e1e6d92p1f74dajsnbe021ba6e177',
                'X-RapidAPI-Host': 'best-game-price-search.p.rapidapi.com'
            }
        });
    }

    getGamerGateListGames(): Observable<APIShopResponse<Shop>> {
        let params = new HttpParams().set('page', '1').set('limit', '5');

        return this.http.get<APIShopResponse<Shop>>(`${env.SHOP_URL}/ggate/specials`, {
            params: params,
            headers: {
                'X-RapidAPI-Key': 'fd3f2b161cmshab4c0046e1e6d92p1f74dajsnbe021ba6e177',
                'X-RapidAPI-Host': 'best-game-price-search.p.rapidapi.com'
            }
        });
    }

    getGamesList(gameName: string): Observable<APIShopResponse<Shop>> {
        let params = new HttpParams().set('page', '1').set('limit', '5').set('currency', 'USD').set('maxprice', '1000');

        return this.http.get<APIShopResponse<Shop>>(`${env.SHOP_URL}/bestprice/${gameName}/`, {
            params: params,
            headers: {
                'X-RapidAPI-Key': 'fd3f2b161cmshab4c0046e1e6d92p1f74dajsnbe021ba6e177',
                'X-RapidAPI-Host': 'best-game-price-search.p.rapidapi.com'
            }
        });
    }

    getHomeList(): Observable<APIShopResponse<Shop>> {
        let params = new HttpParams().set('page', '1').set('limit', '5');

        return this.http.get<APIShopResponse<Shop>>(`${env.SHOP_URL}/ggate/specials`, {
            params: params,
            headers: {
                'X-RapidAPI-Key': 'fd3f2b161cmshab4c0046e1e6d92p1f74dajsnbe021ba6e177',
                'X-RapidAPI-Host': 'best-game-price-search.p.rapidapi.com'
            }
        });
    }

    // getEpicFreeListGames(): Observable<APIShopResponse<Shop>> {
    //     let params = new HttpParams().set('page', '1').set('limit', '5');

    //     return this.http.get<APIShopResponse<Shop>>(`${env.SHOP_URL}/epic/free`, {
    //         params: params,
    //         headers: {
    //             'X-RapidAPI-Key': 'fd3f2b161cmshab4c0046e1e6d92p1f74dajsnbe021ba6e177',
    //             'X-RapidAPI-Host': 'best-game-price-search.p.rapidapi.com'
    //         }
    //     });
    // }
}
