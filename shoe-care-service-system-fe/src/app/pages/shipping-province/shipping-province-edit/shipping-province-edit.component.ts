import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ShippingProvinceService} from "../../../services/shipping-province.service";
import {DialogService} from "../../../services/dialog.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-shipping-province-edit',
  templateUrl: './shipping-province-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})
export class ShippingProvinceEditComponent implements OnInit {
  shippingProvinceForm: FormGroup;
  message: string = '';
  provinceId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private shippingProvinceService: ShippingProvinceService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.shippingProvinceForm = this.formBuilder.group({
      province: ['', [Validators.required, Validators.minLength(3)]],
      fee: [0, [Validators.required, Validators.min(1000)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.provinceId = params.get('id') || '';
      console.log('provinceId:', this.provinceId);
      if (this.provinceId) {
        this.loadProvince(Number(this.provinceId));
      }
    });
  }

  loadProvince(id: number) {
    this.shippingProvinceService.findById(id).subscribe({
      next: (data) => {
        const province = data.result;
        this.shippingProvinceForm.patchValue({
          province: province.province,
          fee: province.fee
        });
      },
      error: (err) => {
        console.error('Error loading province:', err);
      }
    });
  }

  updateProvince() {
    if (this.shippingProvinceForm.valid) {
      const updatedProvince = this.shippingProvinceForm.getRawValue();
      updatedProvince.id = Number(this.provinceId);
      this.shippingProvinceService.updateProvince(updatedProvince.id, updatedProvince).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật tỉnh thành công!', 'OK');
          this.loadProvince(Number(this.provinceId));
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
