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
  public selectedCar: Car = new Car();
  public state: number = 1;
  public selectedYear: string = '';
  public iconsArr: string[] = [];
  private cars: Car[] = [];
  public mazda: Car[] = [];
  public toyota: Car[] = [];
  public hyunday: Car[] = [];
  public kia: Car[] = [];
  public nissan: Car[] = [];
  public mitsubishi: Car[] = [];
  public renault: Car[] = [];
  public peugeot: Car[] = [];
  public audi: Car[] = [];
  public suzuki: Car[] = [];
  public honda: Car[] = [];
  public ford: Car[] = [];
  public wolswagen: Car[] = [];
  public skoda: Car[] = [];
  constructor(private httpService: HttpClient, private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.ngxService.start();
    this.httpService.get(this.baseUrl + this.paths.GETCARS).subscribe((cars: any) => {
      if (cars && cars.data) {
        this.cars = cars.data;
        this.mazda = this.cars.filter(c => c.title === 'mazda');
        this.toyota = this.cars.filter(c => c.title === 'toyota');
        this.hyunday = this.cars.filter(c => c.title === 'hyunday');
        this.kia = this.cars.filter(c => c.title === 'kia');
        this.nissan = this.cars.filter(c => c.title === 'nissan');
        this.mitsubishi = this.cars.filter(c => c.title === 'mitsubishi');
        this.renault = this.cars.filter(c => c.title === 'renault');
        this.peugeot = this.cars.filter(c => c.title === 'peugeot');
        this.audi = this.cars.filter(c => c.title === 'audi');
        this.suzuki = this.cars.filter(c => c.title === 'suzuki');
        this.honda = this.cars.filter(c => c.title === 'honda');
        this.ford = this.cars.filter(c => c.title === 'ford');
        this.wolswagen = this.cars.filter(c => c.title === 'wolswagen');
        this.skoda = this.cars.filter(c => c.title === 'skoda');
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
    let arrLenght = Number(this.selectedCar.icons[yearIndex]);
    let prefix = '/assets/' + this.selectedCar.title + '/' + this.selectedCar.englishModelName + '/';
    if (this.selectedCar.isHybrid) {
      prefix += 'hybrid/';
    }
    if (year.length === 4 || year.length === 8 || (year.endsWith('+') && year.length === 5)) {
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
