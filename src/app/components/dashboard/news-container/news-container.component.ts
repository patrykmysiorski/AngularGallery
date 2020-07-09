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
  limit: number;
  currentPage: number;
  start: number;
  end: number;
  numberOfPages: number;

  fetchGalleries() {
    this.http.get('http://project.usagi.pl/news', this.httpOptions).toPromise().then((response: INews[]) => {
      this.newsList = response.filter(news => news.newsId != '');
      // this.numberOfPages = this.calculateNumberOfPages();
      // this.travelYearsArray = this.createSortedYearsArray();
    });
  }

  addNews() {
    this.fetchGalleries();
    this.showForm = !this.showForm;
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

  setCurrentPage(page = 0) {
    this.limit = 3;
    this.currentPage = page;
    this.start = this.currentPage * this.limit;
    this.end = this.start + 3;
    localStorage.setItem('newsPage', this.currentPage.toString());
  }

  moveBack() {
    this.setCurrentPage(this.currentPage - 1);
  }

  moveForward() {
    this.setCurrentPage(this.currentPage + 1);
  }

  calculateNumberOfPages(): any {
    let numberOfPages = Array(Math.ceil(this.newsList.length /
      this.limit)).fill(1);
    if (numberOfPages[0] == undefined) {
      numberOfPages[0] = 1;
    }
    return numberOfPages;
  }

  ngOnInit(): void {
    this.numberOfPages = this.calculateNumberOfPages();
    this.currentPage = parseInt(localStorage.getItem('galleryPage')) || 0;
    this.setCurrentPage(this.currentPage);
  }

}
