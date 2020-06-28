import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from '../../../../intefaces/IGallery';
import {Galleries} from '../../../constants/galleries.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: '104'
      }
    )
  };

  private galleryId: string;
  gallery: IGallery;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    const url = 'http://project.usagi.pl/gallery/' + this.galleryId;
    this.http.get(url, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = response;
    });
  }

}
