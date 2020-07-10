import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {INews} from '../../../../intefaces/INews';
import {httpOptions} from 'src/app/constants/httpUtils';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  newsId: string;
  news: INews;
  httpOptions = httpOptions;

  showEdiNews: boolean = false;

  toggleShowEdiNews() {
    this.showEdiNews = !this.showEdiNews;
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {
  }

  backToDashboard() {
    this._location.back();
  }

  onSaveNews(news) {
    this.http.post(`http://project.usagi.pl/news/${news.newsId}`,
      news, this.httpOptions).toPromise().then((response: INews) => {
      this.news = {...response};
    });
    this.toggleShowEdiNews();
  }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('newsId');
    const url = `http://project.usagi.pl/news/${this.newsId}`;
    this.http.get(url, this.httpOptions).toPromise().then((response: INews) => {
      this.news = {...response};
    });
  }

}
