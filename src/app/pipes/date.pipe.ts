import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dp'
})
export class DatePipe implements PipeTransform {

  transform(value: Date): string {
    let day = value.getDate().toString();
    if (day.length === 1) {
      day = '0'+ day
    }
    let month = (value.getMonth() + 1);
    if (month > 12) {
      month = 1
    }
    let finalMonth = month.toString();
    if (finalMonth.length === 1) {
      finalMonth = '0'+ finalMonth
    }
    let year = value.getFullYear();
    return day + '/' + finalMonth + '/' + year;
  }

}
