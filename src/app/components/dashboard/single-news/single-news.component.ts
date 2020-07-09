import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INews} from '../../../../intefaces/INews';
import {httpOptions} from '../../../constants/httpUtils';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {

  @Output()
  deleteNews = new EventEmitter();

  @Input() news: INews;

  httpOptions = httpOptions;

  onDeleteNews() {
    const url = `http://project.usagi.pl/news/delete/${this.news.newsId}`;
    this.http.post(url, {}, this.httpOptions).toPromise().then(() => {
      this.deleteNews.emit(this.news.newsId);
    });
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

}
