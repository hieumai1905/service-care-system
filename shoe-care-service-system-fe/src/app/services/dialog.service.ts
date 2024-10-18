import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogData} from "../model/ConfirmDialogData";
import {ConfirmDialogComponent} from "../pages/confirm-dialog-data/confirm-dialog-data.component";
import {NotificationDialogComponent} from "../pages/confirm-dialog-data/notification-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {
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

  notificationOpen(
    title: string = 'Thông báo',
    message: string = 'Hành động đã thực hiện thành công',
    confirmText: string = 'Xác nhận'
  ): Observable<boolean> {
    const dialogData: ConfirmDialogData = {
      title,
      message,
      confirmText,
      cancelText: ''
    };

    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '450px',
      data: dialogData
    });

    return dialogRef.afterClosed();
  }
}
