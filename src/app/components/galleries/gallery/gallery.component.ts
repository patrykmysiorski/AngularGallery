import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from '../../../../intefaces/IGallery';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../../../intefaces/IComments';
import {httpOptions} from '../../../constants/httpUtils';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  httpOptions = httpOptions;

  private galleryId: string;
  gallery: IGallery;
  comments: IComment[];

  addTag(tag: string) {
    console.log(tag);
    const index = this.gallery.tags.findIndex(item => item.tag === tag);
    if (index === -1) {
      this.gallery.tags.push(tag);


      this.http.post(`http://project.usagi.pl/gallery/${this.gallery.galleryId}`,
        this.gallery, this.httpOptions).toPromise().then((response: IGallery) => {
        this.gallery = response;
      });
    }
  }

  updateComments(event) {
    this.comments.push(event);
  }

  deleteComment(commentId) {
    this.comments = this.comments.filter(comment => comment.commentId !== commentId);
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    const url = 'http://project.usagi.pl/gallery/' + this.galleryId;
    this.http.get(url, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = response;
    });
    const urlForComments = 'http://project.usagi.pl/comment/byGallery/' + this.galleryId;
    this.http.get(urlForComments, this.httpOptions).toPromise().then((response: IComment[]) => {
      console.log('response', response);
      this.comments = response;
    });
  }

}
