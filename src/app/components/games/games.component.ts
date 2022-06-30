import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models/games';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {

  public sort: any;
  public games: any;
  public page: any;

  private routeSub: any;
  private gameSub: any;

  constructor(public httpService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.page = Number(params['page-id']);

      if (params['game-search']) {
        this.searchGames('-added', 1, params['game-search']);
      } else {
        this.searchGames('-added', params['page-id']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gameSub)
      this.gameSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

  searchGames(sort: string, page?: number, search?: string): void {
    this.gameSub = this.httpService.getGamesList(sort, page, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.sort = sort;
        this.games = gameList.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSearchGameSubmit(form: NgForm) {
    this.router.navigate(['games', 'search', form.value.search]);
  }

  openGameDetails(id: number) {
    this.router.navigate(['game-details', id]);
  }
}