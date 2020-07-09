import {Component, OnInit} from '@angular/core';
import {httpOptions} from 'src/app/constants/httpUtils';
import {HttpClient} from '@angular/common/http';
import {INews} from '../../../../intefaces/INews';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit {
  newsList: INews[];
  httpOptions = httpOptions;
  showForm: boolean = false;

  fetchGalleries() {
    this.http.get('http://project.usagi.pl/news', this.httpOptions).toPromise().then((response: INews[]) => {
      this.newsList = response.filter(news => news.newsId != '');
      // this.numberOfPages = this.calculateNumberOfPages();
      // this.travelYearsArray = this.createSortedYearsArray();
    });
  }

  onDeleteNews(newsId) {
    this.newsList = this.newsList.filter(news => news.newsId !== newsId);
  }

  constructor(private http: HttpClient) {
    this.fetchGalleries();
  }

  onShowFormClick() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
  }

}
