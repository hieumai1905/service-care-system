import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryServiceService} from "../../../services/category-service.service";
import {BrandService} from '../../../services/brand.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DialogService} from '../../../services/dialog.service';
import {ServiceCareService} from "../../../services/service-care.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ServiceEditComponent implements OnInit {
  serviceForm: FormGroup;
  brands: Array<any> = [];
  categories: Array<any> = [];
  message: string = '';
  serviceId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceCareService,
    private categoryService: CategoryServiceService,
    private brandService: BrandService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      serviceCode: ['', [Validators.required]],
      createAt: [new Date()],
      isActive: [false],
      note: [''],
      consumingTime: [0, [Validators.required, Validators.min(1)]],
      categoryServiceId: [0, [Validators.required]],
      brandId: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id') || '';
      if (this.serviceId) {
        this.loadService(Number(this.serviceId));
      }
    });
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data.result;
      },
      error: (err) => {
        console.error('Error loading brands', err);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
      },
      error: (err) => {
        console.error('Error loading categories', err);
      }
    });
  }

  loadService(serviceId: number): void {
    this.serviceService.findById(serviceId).subscribe({
      next: (data) => {
        this.serviceForm.patchValue(data.result);
      },
      error: (err) => {
        console.error('Error loading service', err);
      }
    });
  }

  updateService(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      this.serviceService.updateService(serviceData).subscribe({
        next: (data) => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật dịch vụ thành công!', 'OK');
          this.loadService(Number(this.serviceId));
        },
        error: (err) => {
          this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
        }
      });
    } else {
      this.message = 'Vui lòng kiểm tra lại thông tin.';
    }
  }
}
