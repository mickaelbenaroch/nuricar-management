import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'yearPipe'
})
export class YearPipePipe implements PipeTransform {

  transform(year: string): string {
    if (year && year.includes('post') && year.length === 8) {
      let temp = year[0] + year[1] + year[2] + year[3];
      return temp;
    } else if (year && year.includes('h') && year.length === 10) {
      let temp =  year[0] + year[1] + year[2] + year[3] +  year[4] + year[5] + year[6] + year[7] + year[8];
      return temp;
    } else if (year && year.includes('posth') && year.length === 9){
      let temp = year[0] + year[1] + year[2] + year[3];
      return temp;
    } else {
      return year;
    }
  }

}
