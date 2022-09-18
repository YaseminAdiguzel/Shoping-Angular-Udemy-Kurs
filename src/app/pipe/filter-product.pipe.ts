import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    try {
      return value.filter(p=> p.name.toLowerCase().indexOf(filterText.toLocaleLowerCase())!==-1);
    } catch (error) {
      return value;
    }
  }

}
