import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  public news: any;

  private routeSub: any;
  private newsSub: any;

  constructor(private httpService: NewsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['news-search']) {
          this.searchNews(params['news-search']);
        } else {
          this.searchNews('best games');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.newsSub)
      this.newsSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

  searchNews(title: string) {
    this.newsSub = this.httpService.getNewsListByTitle(title).subscribe(
      (result: any) => {
        this.news = result.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSearchNewsSubmit(form: NgForm) {
    this.router.navigate(['news', 'search', form.value.search]);
  }

  openNewDetails(id: number) {
    this.router.navigate(['new-details', id]);
  }
}
