import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../../services/brand.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  brandForm: FormGroup;
  message: string = '';
  brandId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.brandId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBrandDetails();
  }

  loadBrandDetails() {
    if (this.brandId === undefined) {
      return;
    }
    this.brandService.findById(this.brandId).subscribe({
      next: (data) => {
        this.brandForm.patchValue({
          name: data.result.name
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  updateBrand() {
    if (this.brandForm.valid && this.brandId !== undefined) {
      const brandData = {
        id: this.brandId,
        name: this.brandForm.value.name
      };

      this.brandService.updateBrand(brandData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật thương hiệu thành công!', 'OK');
          this.brandForm.reset();
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
