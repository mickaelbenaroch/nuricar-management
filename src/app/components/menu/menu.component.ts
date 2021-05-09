import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goTo(domain: string) {
    if (domain) {
      switch (domain) {
        case 'cars':
          this.router.navigateByUrl('cars');
          break;
        case 'lights':
          this.router.navigateByUrl('icons');
          break;
      }
    }
  }
}
