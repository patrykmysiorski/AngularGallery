import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IComment} from '../../../../intefaces/IComment';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {httpOptions} from '../../../constants/httpUtils';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @ViewChild('commentForm', {static: false})
  commentForm: NgForm;

  httpOptions = httpOptions;

  @Input() galleryId: string;
  comment: IComment;

  emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  @Output()
  addComment = new EventEmitter();


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.comment = this.setEmptyComment();
  }

  onSubmit() {
    this.http.post(`http://project.usagi.pl/comment`, this.comment,
      this.httpOptions).toPromise().then((response: IComment) => {
      this.addComment.emit(response);
    });
    this.commentForm.resetForm();
    this.comment = this.setEmptyComment();
  }

  private setEmptyComment() {
    const newDate = new Date();
    return {
      galleryId: this.galleryId,
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      dateCreated: newDate
    };
  }

  onCancel() {
    this.setEmptyComment();
    this.commentForm.resetForm();
  }


}
