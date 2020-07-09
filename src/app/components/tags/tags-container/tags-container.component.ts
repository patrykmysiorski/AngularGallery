import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGallery} from '../../../../intefaces/IGallery';

@Component({
  selector: 'app-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrls: ['./tags-container.component.scss']
})
export class TagsContainerComponent implements OnInit {

  @Input() gallery: IGallery;

  // @Input() addTag: string;

  @Output()
  removeTag = new EventEmitter();

  @Output()
  addTag = new EventEmitter();

  onRemoveTag(tag) {
    this.removeTag.emit(tag);
  }

  onAddTag(tag) {
    this.addTag.emit(tag);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
