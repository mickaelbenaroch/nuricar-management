import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiPaths } from 'src/const/api-paths';
import { MissingIcon } from 'src/models/missing-icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from 'src/app/pipes/date.pipe';
@Component({
  standalone: true,
   imports: [CommonModule, FormsModule, DatePipe],
  selector: 'app-missing-icons',
  templateUrl: './missing-icons.component.html',
  styleUrls: ['./missing-icons.component.scss']
})
export class MissingIconsComponent implements OnInit {
  private path = ApiPaths;
  private readonly baseUrl = "https://yossi-deliveries-api.vercel.app/";
  public missingIcons: MissingIcon[] = [];
  constructor(private httpclient: HttpClient, private ngxservice: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getMissingIcons();
  }
  getMissingIcons() {
    this.ngxservice.start();
    this.getIconsCall();
  }
  getIconsCall() {
    this.httpclient.get(this.baseUrl + this.path.MISSINGICONS).subscribe((res: any) => {
      if (res && res.data) {
        let temp = res.data;
        for (let i = 0; i < temp.length ; i++) {
          if (temp[i].isNew) {
            temp[i].date = new Date(temp[i].date);
            this.missingIcons.push(temp[i]);
          }
        }
        this.ngxservice.stop();
      } else {
        this.getIconsCall();
      }
    });  
  }
  markAsread(icon: MissingIcon) {
    this.ngxservice.start();
    this.callmarkAsReadApi(icon);
  }

  callmarkAsReadApi(icon: MissingIcon) {
    let model = {
      _id: icon._id,
      isNew: false
    }
    this.httpclient.post(this.baseUrl + this.path.MARKMISSONGICONASREAD, model).subscribe((res: any) => {
      if (res && res.data && res.data.result && res.data.result.n === 1) {
        setTimeout(() => {
          this.getMissingIcons();
        }, 1000);
        this.ngxservice.stop();
      } else {
        this.callmarkAsReadApi(icon);
      }
    })
  }
}
