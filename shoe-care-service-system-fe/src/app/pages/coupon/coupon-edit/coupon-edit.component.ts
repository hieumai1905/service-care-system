import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CouponService} from '../../../services/coupon.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit {
  couponForm: FormGroup;
  message: string = '';
  couponId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private couponService: CouponService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.couponForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      discount: [0, [Validators.required, Validators.min(1000)]],
      requireValue: [0, [Validators.required, Validators.min(1)]],
      expireAt: ['', [Validators.required, this.validateDate]],
      isPercent: [false],
      isActive: [true],
      numberOfItems: []
    });
  }

  ngOnInit() {
    this.couponId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCouponDetails();
    this.couponForm.get('isPercent')?.valueChanges.subscribe(isPercent => {
      this.onPercentChange(isPercent);
    });
  }

  loadCouponDetails() {
    if (this.couponId === undefined) {
      return;
    }
    this.couponService.findById(this.couponId).subscribe({
      next: (data) => {
        console.log(data);
        this.couponForm.patchValue({
          title: data.result.title,
          discount: data.result.discount,
          requireValue: data.result.requireValue,
          expireAt: this.formatDate(data.result.expireAt),
          isPercent: data.result.isPercent,
          isActive: data.result.isActive,
          numberOfItems: data.result.numberOfItems
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  updateCoupon() {
    if (this.couponForm.valid && this.couponId !== undefined) {
      const couponData = this.couponForm.value;

      const [day, month, year] = couponData.expireAt.split('/');
      couponData.expireAt = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      couponData.id = this.couponId;

      this.couponService.updateCoupon(couponData).subscribe({
        next: (res) => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật mã giảm giá thành công!', 'OK');
          this.message = '';
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
