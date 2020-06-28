import {Pipe, PipeTransform} from '@angular/core';
import {IGallery} from '../../intefaces/IGallery';
import * as moment from 'moment';

@Pipe({
  name: 'searchByYear'
})
export class SearchByYearPipe implements PipeTransform {

  galleries: IGallery[];

  transform(value: any, ...args: any): any {
    this.galleries = value;
    if (args[0]) {
      this.galleries = this.galleries.filter(gallery => {
        const year: any = parseInt(moment(gallery.dateCreated).format('yyyy'), 10);
        return (
          year === args[0]
        );
      });
    }

    return this.galleries;
  }

}
