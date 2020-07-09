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
  newsCopy: INews;

  httpOptions = httpOptions;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {
  }

  backToDashboard() {
    this._location.back();
  }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('newsId');
    const url = `http://project.usagi.pl/news/${this.newsId}`;
    this.http.get(url, this.httpOptions).toPromise().then((response: INews) => {
      this.newsCopy = {...response};
    });
  }

}
