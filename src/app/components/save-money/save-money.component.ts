import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-save-money',
  templateUrl: './save-money.component.html',
  styleUrls: ['./save-money.component.scss']
})
export class SaveMoneyComponent implements OnInit {

  public steamShops: any;
  public gameGateShops: any;
  public gamesList: any;

  private routeSub: any;

  constructor(private httpService: ShopService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['game-name']) {
          this.getSearchGames(params['game-name']);
        } else {
          this.getSteamList();
          this.getGamesGateList();
        }
      }
    );
  }

  searchPrice(form: NgForm) {
    this.router.navigate(['save-money', 'search', form.value.search]);
  }

  getSearchGames(gameName: string) {
    this.httpService.getGamesList(gameName).subscribe(
      (result: any) => {
        this.gamesList = result.results;
        console.log(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getSteamList() {
    this.httpService.getSteamListGames().subscribe(
      (result: any) => {
        this.steamShops = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getGamesGateList() {
    this.httpService.getGamerGateListGames().subscribe(
      (result: any) => {
        this.gameGateShops = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // getFreeList() {
  //   this.httpService.getEpicFreeListGames().subscribe(
  //     (result: any) => {
  //       this.freeEpicGames = result.results;
  //       console.log(result);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
}