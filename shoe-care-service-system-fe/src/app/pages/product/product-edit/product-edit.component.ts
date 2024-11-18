import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ColorService} from '../../../services/color.service';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProductService} from "../../../services/category-product.service";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ]
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productCategories: any[] = [];
  colors: any[] = [];
  message: string = '';
  sizes: any[] = [];
  currentImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | undefined;
  productId: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryProductService: CategoryProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private dialogService: DialogService,
    private route: ActivatedRoute
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
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();

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

  private loadProduct() {
    if (this.productId !== -1) {
      this.productService.findById(this.productId).subscribe({
        next: (data) => {
          const product = data.result[0];
          console.log('product:', product);

          this.productForm.patchValue({
            name: product.name,
            code: product.code,
            inputPrice: product.inputPrice,
            sellPrice: product.sellPrice,
            description: product.description,
            quantity: product.quantity,
            productCategoryId: product.productCategoryId,
            colorId: product.colorId,
            sizeId: product.sizeId
          });

          this.currentImage = product.image ? product.image : '';
          this.imagePreview = product.image ? 'assets/images/products/' + product.image : '';
        },
        error: (err) => {
          console.error('Error loading product:', err);
        }
      });
    }
  }

  updateProduct() {
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
      formData.append('id', this.productId.toString());

      this.productService.updateProduct(formData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật sản phẩm thành công!', 'OK');
          this.loadProduct();
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
