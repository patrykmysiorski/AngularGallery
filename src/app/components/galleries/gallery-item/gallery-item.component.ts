import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IGallery} from '../../../../intefaces/IGallery';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit {

  @Input() gallery: IGallery;
  @Output() deleteGallery: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onDelete(galleryId: string) {
    this.deleteGallery.emit(galleryId);
  }

  ngOnInit(): void {
  }

}
