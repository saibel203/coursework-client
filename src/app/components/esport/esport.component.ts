import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsportService } from 'src/app/services/esport.service';

@Component({
  selector: 'app-esport',
  templateUrl: './esport.component.html',
  styleUrls: ['./esport.component.scss']
})
export class EsportComponent implements OnInit {

  public esportGames: any;
  public upcomingTournaments: any;

  constructor(private httpService: EsportService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUpcoming();
  }

  getLiveEsport() {
    this.httpService.listLiveMatches().subscribe(
      (result: any) => {
        this.esportGames = result;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUpcoming() {
    this.httpService.getUpcomingTournaments().subscribe(
      (result: any) => {
        this.upcomingTournaments = result;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openTournamentDetails(id: any) {
    this.router.navigate(['tournament', id]);
  }

}
