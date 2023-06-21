import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiPaths } from 'src/const/api-paths';
import { Icon } from 'src/models/icons';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  private readonly baseUrl = 'https://yossi-deliveries-api.vercel.app/';
  private paths = ApiPaths;
  public icons: Icon[] = [];
  public newIcon = new Icon();
  public searchString = '';
  public showNewIconContent = false;
  private scrollHeight = 0;
  constructor(private httpClient: HttpClient,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getIcons();
  }

  cleanFilter() {
    this.searchString = '';
    this.getIcons();
  }

  search() {
    if (this.searchString) {
      this.icons = this.icons.filter(i => i.title.includes(this.searchString));
    }
  }

  deletePath(icon: Icon, path: string) {
    this.dialog.open(DialogComponent, {
      height: '200px',
      width: '500px',
      panelClass: 'missing-box',
      data: {
        header: 'Delete path from icon',
        body: 'Are you sure you want to delte this path from this icon? (NO WAY BACK)'
      }
    }).afterClosed().subscribe(res => {
      if (res && res === 'ok') {
        console.log('ok ' + res);
        const obj = {
          _id: icon._id,
          path
        };
        this.httpClient.post(this.baseUrl + this.paths.DELETEPATH, obj).subscribe(
          (response: any) => {
            if (response && response.data) {
              window.alert(`Icon has been removed from path successfully!`);
              this.ngxService.stop();
              this.getIcons();
            } else {
              console.log('לא הצליח!');
              this.ngxService.stop();
              this.getIcons();
            }
          },
          (err: any) => {
            console.log('back from server with error : ' + err);
            this.ngxService.stop();
          }
        );
      } else {
        console.log('cancel' + res);
      }
    });
  }

  delete(icon: Icon) {
    this.dialog.open(DialogComponent, {
      height: '180px',
      width: '500px',
      panelClass: 'missing-box',
      data: {
        header: 'Delete Icon',
        body: 'Are you sure you want to delte this icon? (NO WAY BACK)'
      }
    }).afterClosed().subscribe(res => {
      if (res && res === 'ok') {
        console.log('ok ' + res);
        this.httpClient.post(this.baseUrl + this.paths.DELETEICON, {_id: icon._id}).subscribe(
          (response: any) => {
            if (response && response.data) {
              window.alert(`Icon has been deleted successfully!`);
              this.ngxService.stop();
              this.getIcons();
            } else {
              console.log('לא הצליח!');
              this.ngxService.stop();
              this.getIcons();
            }
          },
          (err: any) => {
            console.log('back from server with error : ' + err);
            this.ngxService.stop();
          }
        );
      } else {
        console.log('cancel' + res);
      }
    });
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
            console.log('לא הצליח!');
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
        this.restoreScroll();
      } else {
        console.log('error to get icons');
        this.getIcons();
      }
    });
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
  private restoreScroll() {
    window.scrollTo(0, this.scrollHeight);
  }
  sendToDB(icon: Icon) {
    this.scrollHeight = window.pageYOffset;
    this.ngxService.start();
    this.httpClient.post(this.baseUrl + this.paths.UPDATEICONS, icon).subscribe((res: any) => {
      if (res && res.data && res.data.result && res.data.result.n === 1) {
        this.getIcons();
      } else {
        this.sendToDB(icon);
      }
    });
  }

  modelChanged(change: any, icon: Icon, action: string) {
    const ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      const ind = this.icons.indexOf(ic);
      switch (action) {
        case 'title':
          this.icons[ind].title = change.target.value;
          break;
        case 'description':
          this.icons[ind].description = change.target.value;
          break;
        case 'suggestion':
          this.icons[ind].suggestion = change.target.value;
          break;
        case 'severity':
          this.icons[ind].severity = change.target.value;
          break;
        case 'more':
          this.icons[ind].more = change.target.value;
          break;
      }
    }
    console.log(this.icons);
  }

  addPath(icon: Icon) {
    const ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      this.icons[this.icons.indexOf(ic)].paths.push(icon.temp.toString());
    }
  }
  modelpathAdd(event: any, icon: Icon) {
    const  ic = this.icons.find(tl => tl.title === icon.title);
    if (ic) {
      this.icons[this.icons.indexOf(ic)].temp = event.target.value;
    }
  }
}
