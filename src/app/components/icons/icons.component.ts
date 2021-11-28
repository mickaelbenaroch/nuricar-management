import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiPaths } from 'src/const/api-paths';
import { Icon } from 'src/models/icons';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  private readonly baseUrl = "https://yossi-deliveries-api.vercel.app/";
  private paths = ApiPaths;
  public icons: Icon[] = [];
  public newIcon = new Icon();
  public searchString: string = '';
  public showNewIconContent: boolean = false;
  constructor(private httpClient: HttpClient, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getIcons();
  }

  cleanFilter() {
    this.searchString = '';
    this.getIcons();
  }

  search() {
    if (this.searchString) {
      this.icons = this.icons.filter(i => { return i.title.includes(this.searchString)})
    }
  }

  toggleAddNewIcon() {
    this.showNewIconContent = !this.showNewIconContent;
  }
  createIcon() {
    if (this.newIcon) {
      this.ngxService.start();
      this.httpClient.post(this.baseUrl + this.paths.CREATEICON, this.newIcon).subscribe(
        (response: any) => {
          if (response && response.data) {
            window.alert(`new icon ${this.newIcon.title} has been created successfully!`);
            this.ngxService.stop();
            this.getIcons();
          } else {
            console.log("לא הצליח!");
            this.ngxService.stop();
            this.getIcons();
          }
        },
        (err: any) => {
          console.log('back from server with error : ' + err);
          this.ngxService.stop();
        }
      );
    }
  }

  getIcons() {
    this.ngxService.start();
    this.httpClient.get(this.baseUrl + this.paths.GETICONS).subscribe((response: any) => {
      if (response && response.data) {
        this.icons = response.data;
        this.icons.forEach(ic => ic.buttonState = 'Edit');
        this.ngxService.stop();
      } else {
        console.log('error to get icons');
        this.getIcons();
      }
    })
  }

  edit(icon: Icon) {
    console.log('editing...');
    console.log(icon.title);
    icon.isInEditMode = !icon.isInEditMode;
    if (icon.buttonState === 'Edit') {
      icon.buttonState = 'Save';
    } else {
      this.sendToDB(icon);
      icon.buttonState = 'Edit';
    }
  }
  sendToDB(icon: Icon) {
    this.ngxService.start();
    this.httpClient.post(this.baseUrl + this.paths.UPDATEICONS, icon).subscribe((res: any)=> {
      if (res && res.data && res.data.result && res.data.result.n === 1) {
        this.getIcons();
      } else {
        this.sendToDB(icon);
      }
    });
  }

  modelChanged(change: any, icon: Icon, action: string) {
    let ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      let ind = this.icons.indexOf(ic);
      switch(action) {
        case 'title':
          this.icons[ind].title = change.target.value;
          break;
        case 'description':
          this.icons[ind].description = change.target.value;
          break
        case 'suggestion':
          this.icons[ind].suggestion = change.target.value;
          break
        case 'severity':
          this.icons[ind].severity = change.target.value;
          break
        case 'more':
          this.icons[ind].more = change.target.value;
          break
      }
    }
    console.log(this.icons);
  }

  addPath(icon: Icon) {
    let ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      this.icons[this.icons.indexOf(ic)].paths.push(icon.temp.toString());
    }
  }
  modelpathAdd(event: any, icon: Icon) {
    let  ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      this.icons[this.icons.indexOf(ic)].temp = event.target.value;
    }
  }
}
