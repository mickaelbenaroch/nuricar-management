import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiPaths } from 'src/const/api-paths';
import { Car } from 'src/models/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  title = 'Nuricar-Management';
  private readonly baseUrl = "https://yossi-deliveries-api.vercel.app/";
  private paths = ApiPaths;
  public cars: Car[] = [];
  public selectedCar: Car = new Car();
  public state: number = 1;
  public selectedYear: string = '';
  public iconsArr: string[] = [];
  constructor(private httpService: HttpClient, private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.ngxService.start();
    this.httpService.get(this.baseUrl + this.paths.GETCARS).subscribe((cars: any) => {
      if (cars && cars.data) {
        this.cars = cars.data;
        this.ngxService.stop();
      } else {
        console.log("error to get cars from server. cars= " + this.cars);
        this.getCars();
      }
    });
  }

  carClicked(car: Car) {
    console.log(car.modelName);
    this.selectedCar = car;
    this.state = 2;
  }

  yearClicked(year: string) {
    console.log(year);
    this.selectedYear = year;
    let temparr = [];
    for (let i = 0; i < this.selectedCar.years.length; i++) {
      if (this.selectedCar.years[i] !== 'hybrid') {
        temparr.push(this.selectedCar.years[i]);
      }
    }
    this.selectedCar.years = temparr;
    let yearIndex = this.selectedCar.years.indexOf(year);
    let arrLenght = this.selectedCar.icons[yearIndex];
    let prefix = '/assets/' + this.selectedCar.title + '/' + this.selectedCar.englishModelName + '/';
    if (this.selectedCar.isHybrid) {
      prefix += 'hybrid/';
    }
    if (year.length === 4 || year.length === 8) {
      prefix = prefix + year + '/';
      prefix = prefix.replace('+', 'post');
    } else {
      prefix = prefix + year + '/';
    }
    for (let i = 1; i < arrLenght + 1; i++) {
      this.iconsArr.push(prefix + 'image' + i + '.png');
    }
    this.state = 3;
  }


}
