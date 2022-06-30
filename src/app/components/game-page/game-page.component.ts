import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models/games';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {

  gameRating = 0;

  routeSub: any;
  gameSub: any;
  game: any;
  gameId: any;

  constructor(private httpService: GamesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    gameTabs();

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.gameDetails(this.gameId);
    });
  }

  ngOnDestroy(): void {
    if (this.gameSub)
      this.gameSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

  gameDetails(id: string) {
    this.gameSub = this.httpService.getGamesDetails(id).subscribe(
      (result: Game) => {
        this.game = result;
        console.log(result);

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }), 1000;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getColor(value: number): string {
    if (value > 75)
      return '#5ee432';
    else if (value > 50)
      return '#fffa50';
    else if (value > 30)
      return '#f7aa38';
    else
      return '#ef4655';
  }
}

function gameTabs() {
  const tabs: any = document.querySelectorAll('[data-role="tab"]'),
    tabContents: any = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab: any) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);

      tabContents.forEach((tc: any) => {
        tc.classList.remove("is-active");
      });
      target.classList.add("is-active");

      tabs.forEach((t: any) => {
        t.classList.remove("is-active");
      });
      tab.classList.add("is-active");
    });
  });

}