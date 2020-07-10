import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {INews} from '../../../../intefaces/INews';

@Component({
  selector: 'app-edit-news-form',
  templateUrl: './edit-news-form.component.html',
  styleUrls: ['./edit-news-form.component.scss']
})
export class EditNewsFormComponent implements OnInit {
  @ViewChild('editNewsForm', {static: false})
  editNewsForm: NgForm;

  @Output()
  saveNews = new EventEmitter();

  @Output()
  closeForm = new EventEmitter();

  @Input() news: INews;


  defaultNews() {
    const news: INews = {
      title: '',
      dateCreated: new Date(),
      shortContent: '',
      fullContent: '',
      photo: {
        photoId: '1',
        thumbUrl: '',
        imgUrl: ''
      }
    };
    return news;
  }

  private resetForm() {
    this.editNewsForm.controls['title'].setErrors(null);
    this.editNewsForm.controls['title'].setValue(this.news.title);
    this.editNewsForm.controls['photo'].setErrors(null);
    this.editNewsForm.controls['photo'].setValue(this.news.photo.thumbUrl);
    this.editNewsForm.controls['shortContent'].setErrors(null);
    this.editNewsForm.controls['shortContent'].setValue(this.news.shortContent);
    this.editNewsForm.controls['fullContent'].setErrors(null);
    this.editNewsForm.controls['fullContent'].setValue(this.news.fullContent);
  }

  onCancel() {
    this.resetForm();
    this.closeForm.emit();
  }

  onSaveNews() {
    this.saveNews.emit({...this.news});
  }

  constructor() {
  }

  ngOnInit(): void {
    this.news = (!!this.news) ? {...this.news} : this.defaultNews();
  }

}
