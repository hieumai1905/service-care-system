import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BrandService} from '../../../services/brand.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent {
  brandForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private dialogService: DialogService
  ) {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addBrand() {
    if (this.brandForm.valid) {
      const brandData = {
        name: this.brandForm.value.name
      };

      this.brandService.addBrand(brandData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm thương hiệu thành công!', 'OK');
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
