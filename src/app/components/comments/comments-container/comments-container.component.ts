import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from '../../../../intefaces/IComments';
import {httpOptions} from '../../../constants/httpUtils';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {

  @Output() deleteComment = new EventEmitter();

  @Input() comments: IComment[];

  httpOptions = httpOptions;

  onDelete(commentId) {
    const url = 'http://project.usagi.pl/comment/delete/' + commentId;
    this.http.post(url, {}, this.httpOptions).toPromise().then(() => {
      this.deleteComment.emit(commentId);
    });
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
  }
}
