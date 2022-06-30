import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsportComponent } from './components/esport/esport.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { NewPageComponent } from './components/new-page/new-page.component';
import { NewsComponent } from './components/news/news.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SaveMoneyComponent } from './components/save-money/save-money.component';
import { TornamentDetailsComponent } from './components/tornament-details/tornament-details.component';
import { AuthGuard } from './interceptors/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'games', component: GamesComponent },
  { path: 'games/page/:page-id', component: GamesComponent },
  { path: 'games/search/:game-search', component: GamesComponent },
  { path: 'game-details/:id', component: GamePageComponent },


  { path: 'news', component: NewsComponent },
  { path: 'news/search/:news-search', component: NewsComponent },
  { path: 'new-details/:id', component: NewPageComponent },

  { path: 'save-money', component: SaveMoneyComponent },
  { path: 'save-money/search/:game-name', component: SaveMoneyComponent },

  { path: 'esport', component: EsportComponent },
  { path: 'tournament/:tournament-id', component: TornamentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
