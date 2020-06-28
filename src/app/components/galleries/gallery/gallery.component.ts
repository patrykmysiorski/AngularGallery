import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from '../../../../intefaces/IGallery';
import {Galleries} from '../../../constants/galleries.constant';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private galleryId: string;
  gallery: IGallery;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    this.gallery = Galleries.find((item: IGallery) => item.galleryId === this.galleryId);
  }

}
