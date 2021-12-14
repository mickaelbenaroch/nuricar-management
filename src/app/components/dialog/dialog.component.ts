import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  header: string = '';
  body: string = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogComponent) {
      this.header = this.data?.header;
      this.body = this.data?.body;
     }

  ngOnInit(): void {
  }

  clickOnButton(response : string) {
    this.dialogRef.close(response);
  }

}


