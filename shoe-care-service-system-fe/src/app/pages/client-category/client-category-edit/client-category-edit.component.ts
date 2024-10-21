import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientCategoryService} from '../../../services/client-category.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-client-category-edit',
  templateUrl: './client-category-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./client-category-edit.component.css']
})
export class ClientCategoryEditComponent implements OnInit {
  clientCategoryForm: FormGroup;
  message: string = '';
  clientCategoryId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private clientCategoryService: ClientCategoryService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.clientCategoryForm = this.formBuilder.group({
      typeName: ['', [Validators.required]],
      discount: [0, [Validators.required, Validators.min(1000)]],
      totalRequire: [0, [Validators.required]],
      note: [''],
      isPercent: [false],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.clientCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClientCategoryDetails();
    this.clientCategoryForm.get('isPercent')?.valueChanges.subscribe(isPercent => {
      this.onPercentChange(isPercent);
    });
  }

  loadClientCategoryDetails() {
    if (this.clientCategoryId === undefined) {
      return;
    }
    this.clientCategoryService.findById(this.clientCategoryId).subscribe({
      next: (data) => {
        this.clientCategoryForm.patchValue({
          typeName: data.result.typeName,
          discount: data.result.discount,
          totalRequire: data.result.totalRequire,
          note: data.result.note,
          isPercent: data.result.discountType === 'percent',
          isActive: data.result.isActive
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  onPercentChange(isPercent: boolean) {
    const discountControl = this.clientCategoryForm.get('discount');
    if (isPercent) {
      discountControl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
    } else {
      discountControl?.setValidators([Validators.required, Validators.min(1000)]);
    }
    discountControl?.updateValueAndValidity();
  }

  updateClientCategory() {
    if (this.clientCategoryForm.valid && this.clientCategoryId !== undefined) {
      const clientCategoryData = this.clientCategoryForm.value;
      clientCategoryData.id = this.clientCategoryId;
      clientCategoryData.discountType = clientCategoryData.isPercent ? 'percent' : 'money';

      this.clientCategoryService.updateClientCategory(clientCategoryData).subscribe({
        next: (res) => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật nhóm khách hàng thành công!', 'OK');
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
