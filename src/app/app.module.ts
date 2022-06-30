import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GaugeModule } from 'angular-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-guard/auth.interceptor';
import { GamesComponent } from './components/games/games.component';
import { HttpGamesErrorsInterceptor } from './interceptors/http-games-errors.interceptor';
import { GamePageComponent } from './components/game-page/game-page.component';
import { NewsComponent } from './components/news/news.component';
import { NewPageComponent } from './components/new-page/new-page.component';
import { SaveMoneyComponent } from './components/save-money/save-money.component';
import { EsportComponent } from './components/esport/esport.component';
import { HomeComponent } from './components/home/home.component';
import { TornamentDetailsComponent } from './components/tornament-details/tornament-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    GamesComponent,
    GamePageComponent,
    NewsComponent,
    NewPageComponent,
    SaveMoneyComponent,
    EsportComponent,
    HomeComponent,
    TornamentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    GaugeModule.forRoot()
  ],
  providers: [AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGamesErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
