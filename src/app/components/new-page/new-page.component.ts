import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit, OnDestroy {

  public article: any;

  private routeSub: any;
  private newSub: any;


  constructor(private httpService: NewsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.newDetails(params['id']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.newSub)
      this.newSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

  newDetails(id: number) {
    this.newSub = this.httpService.getNewDetails(id).subscribe(
      (result: any) => {
        this.article = result.results[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
