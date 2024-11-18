import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ColorService} from '../../../services/color.service';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProductService} from "../../../services/category-product.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ]
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  productCategories: any[] = [];
  colors: any[] = [];
  message: string = '';
  sizes: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryProductService: CategoryProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private dialogService: DialogService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      code: ['', [Validators.required, Validators.minLength(6)]],
      inputPrice: [0, [Validators.required, Validators.min(1000)]],
      sellPrice: [0, [Validators.required, Validators.min(1000)]],
      isActive: [true],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(1)]],
      productCategoryId: ['', Validators.required],
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.imagePreview = undefined;
    }
  }

  ngOnInit() {
    this.categoryProductService.getCategories().subscribe(data => {
      this.productCategories = data.result;
    });

    this.colorService.getColors().subscribe(data => {
      this.colors = data.result;
    });

    this.sizeService.getSizes().subscribe(data => {
      this.sizes = data.result;
    });
  }

  addProduct() {
    if (this.productForm.valid || this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as Blob);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('code', this.productForm.get('code')?.value.toUpperCase());
      formData.append('inputPrice', this.productForm.get('inputPrice')?.value);
      formData.append('sellPrice', this.productForm.get('sellPrice')?.value);
      formData.append('isActive', this.productForm.get('isActive')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('productCategoryId', this.productForm.get('productCategoryId')?.value);
      formData.append('colorId', this.productForm.get('colorId')?.value);
      formData.append('sizeId', this.productForm.get('sizeId')?.value);

      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm sản phẩm thành công!', 'OK');
          this.productForm.reset();
          this.imagePreview = undefined;
          this.selectedFile = null;
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
