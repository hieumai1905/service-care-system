import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogData} from "../model/ConfirmDialogData";
import {ConfirmDialogComponent} from "../pages/confirm-dialog-data/confirm-dialog-data.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {
  }

  open(
    title: string = 'Xác nhận',
    message: string = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText: string = 'Xác nhận',
    cancelText: string = 'Hủy'
  ): Observable<boolean> {
    const dialogData: ConfirmDialogData = {
      title,
      message,
      confirmText,
      cancelText
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: dialogData
    });

    return dialogRef.afterClosed();
  }
}
