import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ShippingProvinceService} from '../../../services/shipping-province.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shipping-province-add',
  templateUrl: './shipping-province-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})
export class ShippingProvinceAddComponent implements OnInit {
  shippingProvinceForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private shippingProvinceService: ShippingProvinceService,
    private dialogService: DialogService
  ) {
    this.shippingProvinceForm = this.formBuilder.group({
      province: ['', [Validators.required, Validators.minLength(3)]],
      fee: [0, [Validators.required, Validators.min(1000)]]
    });
  }

  ngOnInit(): void {
  }

  addProvince(): void {
    if (this.shippingProvinceForm.valid) {
      const provinceData = this.shippingProvinceForm.value;

      this.shippingProvinceService.addProvince(provinceData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm tỉnh thành công!', 'OK');
          this.shippingProvinceForm.reset();
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
