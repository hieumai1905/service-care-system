import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogData} from "../../model/ConfirmDialogData";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  template: `<h2 mat-dialog-title>{{ data.title }}</h2>
  <mat-dialog-content>
    {{ data.message }}
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button class="btn btn-danger" mat-button [mat-dialog-close]="true">{{ data.confirmText }}</button>
    <button mat-button class="btn btn-secondary" mat-dialog-close>{{ data.cancelText }}</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogModule,
    MatButtonModule
  ],
  styles: [`
    mat-dialog-content {
      margin: 20px 0;
    }

    mat-dialog-actions {
      margin-bottom: 10px;
    }
  `]
})
export class ConfirmDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
  }
}
