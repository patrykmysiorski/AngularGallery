import { Component, OnInit, Input } from '@angular/core';
import {IGallery} from '../../../IGallery';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit {

  @Input() gallery: IGallery;

  constructor() { }

  ngOnInit(): void {
  }

}
