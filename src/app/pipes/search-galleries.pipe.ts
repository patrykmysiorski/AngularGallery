import { Pipe, PipeTransform } from '@angular/core';
import {IGallery} from '../../intefaces/IGallery';

@Pipe({
  name: 'searchGalleries'
})
export class SearchGalleriesPipe implements PipeTransform {

  galleries: IGallery[];

  transform(value: any, ...args: any): any {
    this.galleries = value;

    if (args) {
      this.galleries = this.galleries.filter(item => {
        const searchTitle = item.title.toLowerCase();
        const searchDescription = item.description.toLowerCase();
        const searchPhrase = args[0].toLowerCase();
        return (
          searchTitle.indexOf(searchPhrase) !== -1 || searchDescription.indexOf(searchPhrase) !== -1);
      });
    }

    return this.galleries;
  }

}
