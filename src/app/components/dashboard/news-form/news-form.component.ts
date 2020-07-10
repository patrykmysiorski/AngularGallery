import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {httpOptions} from 'src/app/constants/httpUtils';
import {INews} from '../../../../intefaces/INews';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  @ViewChild('newsForm', {static: false})
  newsForm: NgForm;

  @Input() news: INews;

  @Output()
  addNews = new EventEmitter();

  @Output()
  closeForm = new EventEmitter();

  httpOptions = httpOptions;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.news = this.setEmptyNews();
  }

  private setEmptyNews() {
    const newDate = new Date();
    return {
      newsId: '',
      title: '',
      shortContent: '',
      fullContent: '',
      dateCreated: newDate,
      photo: {
        photoId: '',
        thumbUrl: '',
        imgUrl: ''
      }
    };
  };

  private generateNewsId() {
    this.http.get('http://project.usagi.pl/news', this.httpOptions).toPromise().then((response: INews[]) => {
      return response.length;
    });
  }

  onCancel() {
    this.newsForm.resetForm();
    this.closeForm.emit();
  }

  onSubmit() {
    const newsToSubmit = {...this.news, newsId: this.generateNewsId(), photo: {...this.news.photo, photoId: '1'}};
    this.http.post(`http://project.usagi.pl/news`, newsToSubmit,
      this.httpOptions).toPromise().then((response: INews) => {
      this.addNews.emit(response);
    });
    this.newsForm.resetForm();
    this.news = this.setEmptyNews();
  }
}
