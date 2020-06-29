import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../../intefaces/IComments';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {

  @Input() comments: IComment[]

  constructor() {
  }

  ngOnInit(): void {
  }
}
