import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EsportService } from 'src/app/services/esport.service';

@Component({
  selector: 'app-tornament-details',
  templateUrl: './tornament-details.component.html',
  styleUrls: ['./tornament-details.component.scss']
})
export class TornamentDetailsComponent implements OnInit {

  public tourtament: any;

  private routeSub: any;

  constructor(private httpSerivice: EsportService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.getTournamentDetails(params['tournament-id']);
      }
    );
  }

  getTournamentDetails(id: string) {
    this.httpSerivice.getTournamentDetails(id).subscribe(
      (result: any) => {
        this.tourtament = result;
        console.log(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
