import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServiceCareService} from '../../../services/service-care.service';
import {BrandService} from '../../../services/brand.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryService} from "../../../model/CategoryService";
import {CategoryServiceService} from "../../../services/category-service.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class ServiceAddComponent implements OnInit {
  serviceForm: FormGroup;
  brands: Array<any> = [];
  categories: Array<any> = [];
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceCareService,
    private brandService: BrandService,
    private categoryService: CategoryServiceService,
    private dialogService: DialogService
  ) {
    this.serviceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      serviceCode: ['', [Validators.required]],
      inputPrice: [0, [Validators.required, Validators.min(1000)]],
      sellPrice: [0, [Validators.required, Validators.min(1000)]],
      profits: [0, [Validators.required]],
      createAt: [new Date()],
      isActive: [true],
      note: [''],
      consumingTime: [0, [Validators.required, Validators.min(1)]],
      categoryServiceId: [0, [Validators.required, this.categoryValidator]],
      brandId: [0, [Validators.required, this.brandValidator]]
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data.result;
      },
      error: (err) => {
        console.error('Error loading brands:', err);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  categoryValidator(control: any): any {
    if (control.value === 0) {
      return {categoryValidator: {valid: false}};
    }
    return null;
  }

  brandValidator(control: any): any {
    if (control.value === 0) {
      return {brandValidator: {valid: false}};
    }
    return null;
  }

  addService(): void {
    if (this.serviceForm.valid) {
      this.serviceService.addService(this.serviceForm.value).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm dịch vụ thành công!', 'OK');
          this.serviceForm.reset();
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
