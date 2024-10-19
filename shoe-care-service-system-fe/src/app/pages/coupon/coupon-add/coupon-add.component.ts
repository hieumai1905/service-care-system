import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CouponService} from '../../../services/coupon.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./coupon-add.component.css']
})
export class CouponAddComponent implements OnInit {
  couponForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private couponService: CouponService,
    private dialogService: DialogService
  ) {
    this.couponForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      discount: [0, [Validators.required, Validators.min(1000)]],
      requireValue: [0, [Validators.required, Validators.min(1)]],
      numberOfItems: [0, [Validators.required, Validators.min(1)]],
      expireAt: ['', [Validators.required, this.validateDate]],
      isPercent: [false],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.couponForm.get('isPercent')?.valueChanges.subscribe(isPercent => {
      this.onPercentChange(isPercent);
    });
  }

  validateDate(control: any) {
    if (!control.value) {
      return null;
    }

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(control.value)) {
      return {invalidFormat: true};
    }

    const [day, month, year] = control.value.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(inputDate.getTime())) {
      return {invalidFormat: true};
    }

    if (inputDate <= today) {
      return {pastDate: true};
    }

    return null;
  }

  onPercentChange(isPercent: boolean) {
    const discountControl = this.couponForm.get('discount');
    if (isPercent) {
      discountControl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
    } else {
      discountControl?.setValidators([Validators.required, Validators.min(1000)]);
    }
    discountControl?.updateValueAndValidity();
  }

  addCoupon() {
    if (this.couponForm.valid) {
      const couponData = this.couponForm.value;

      // Convert date format before sending to server
      const [day, month, year] = couponData.expireAt.split('/');
      couponData.expireAt = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      this.couponService.addCoupon(couponData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm mã giảm giá thành công!', 'OK');
          this.couponForm.reset({isActive: true});
        },
        error: (err) => {
          this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
        }
      });
    } else {
      this.message = 'Vui lòng điền đúng thông tin trong form.';
    }
  }
}
