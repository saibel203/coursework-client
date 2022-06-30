import { Component, OnInit } from '@angular/core';
import { EsportService } from 'src/app/services/esport.service';
import { GamesService } from 'src/app/services/games.service';
import { NewsService } from 'src/app/services/news.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuth: any = localStorage.getItem('token');

  upcomingTournaments: any;
  gamesList: any;
  newsList: any;
  shopList: any;
  freeGames: any;

  constructor(private httpEsportService: EsportService, private httpGamesService: GamesService, private httpNewsService: NewsService,
    private httpShopService: ShopService) { }

  ngOnInit(): void {
    this.getUpcomingTournaments();
    this.getGames('-added');
    this.getNews();
    this.getPrices();
    this.getFreeGames();
  }

  getUpcomingTournaments() {
    this.httpEsportService.getHomeUpcomingTournaments().subscribe(
      (result: any) => {
        this.upcomingTournaments = result;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getGames(sort: string) {
    this.httpGamesService.getGamesIndexList(sort).subscribe(
      (result: any) => {
        this.gamesList = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getNews() {
    this.httpNewsService.getIndexNews().subscribe(
      (result: any) => {
        this.newsList = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getFreeGames() {
    this.httpGamesService.getHomeFreeToPlay().subscribe(
      (result: any) => {
        this.freeGames = result;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPrices() {
    this.httpShopService.getHomeList().subscribe(
      (result: any) => {
        this.shopList = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  scrollToElement($element: any): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}