import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ColorService} from '../../../services/color.service';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProductService} from "../../../services/category-product.service";
import {CurrencyPipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Size} from "../../../model/Size";
import {Color} from "../../../model/Color";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    CurrencyPipe,
    MatPaginatorModule,
    SlicePipe
  ]
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productCategories: any[] = [];
  message: string = '';
  sizes: Size[] = [];
  colors: Color[] = [];
  currentImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | undefined;
  productId: number = -1;
  productDetailForm: FormGroup;
  productDetails: Array<any> = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  selectedProductDetailIndex: number = -1;

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
      status: ['', Validators.required],
      description: [''],
      productCategoryId: ['', Validators.required],
    });

    this.productDetailForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      inputPrice: [0, [Validators.required, Validators.min(1000)]],
      sellPrice: [0, [Validators.required, Validators.min(1000)]],
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
          const product = data.result;
          console.log('product:', product);

          this.productForm.patchValue({
            name: product.name,
            code: product.code,
            description: product.description,
            productCategoryId: product.productCategoryId,
            status: product.status
          });

          this.initProductDetails(product.productDetails);

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
      formData.append('status', this.productForm.get('status')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('productCategoryId', this.productForm.get('productCategoryId')?.value);
      formData.append('productDetails', JSON.stringify(this.productDetails));
      formData.append('id', this.productId.toString());
      console.log(this.productForm.get('status')?.value);

      this.productService.updateProduct(formData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật sản phẩm thành công!', 'OK');
          this.loadProduct();
          this.productDetails = [];
        },
        error: (err) => {
          this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
        }
      });
    } else {
      this.message = 'Vui lòng điền đúng thông tin trong form.';
    }
  }

  addProductDetail() {
    if (this.productDetailForm.valid) {
      const productDetail = {
        colorId: this.productDetailForm.get('colorId')?.value,
        sizeId: this.productDetailForm.get('sizeId')?.value,
        colorName: this.colors.find(color => color.id == this.productDetailForm.get('colorId')?.value),
        sizeName: this.sizes.find(size => size.id == this.productDetailForm.get('sizeId')?.value),
        quantity: this.productDetailForm.get('quantity')?.value,
        inputPrice: this.productDetailForm.get('inputPrice')?.value,
        sellPrice: this.productDetailForm.get('sellPrice')?.value,
      };

      if (this.selectedProductDetailIndex != -1) {
        this.productDetails.splice(this.selectedProductDetailIndex, 1);
        this.selectedProductDetailIndex = -1;
      }

      const existingProductDetailIndex = this.productDetails.findIndex(
        (detail) => detail.sizeId === productDetail.sizeId && detail.colorId === productDetail.colorId
      );

      if (existingProductDetailIndex !== -1) {
        const existingProductDetail = this.productDetails[existingProductDetailIndex];
        existingProductDetail.quantity += productDetail.quantity;
        existingProductDetail.inputPrice = productDetail.inputPrice;
        existingProductDetail.sellPrice = productDetail.sellPrice;
      } else {
        this.productDetails.push(productDetail);
      }
    }
    this.resetProductDetailForm();
  }


  resetProductDetailForm() {
    this.productDetailForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      inputPrice: [0, [Validators.required, Validators.min(1000)]],
      sellPrice: [0, [Validators.required, Validators.min(1000)]],
    });
    const btnAddProductDetail = document.getElementById('btn-add-edit');
    if (btnAddProductDetail) {
      btnAddProductDetail.innerHTML = 'Thêm chi tiết sản phẩm';
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteProductDetail(index: number) {
    this.productDetails.splice(index, 1);
  }

  editProductDetail(index: number): void {
    const productDetail = this.productDetails[index];

    this.productDetailForm.patchValue({
      colorId: productDetail.colorId,
      sizeId: productDetail.sizeId,
      quantity: productDetail.quantity,
      inputPrice: productDetail.inputPrice,
      sellPrice: productDetail.sellPrice,
    });
    this.selectedProductDetailIndex = index;
    console.log(this.selectedProductDetailIndex);

    const btnAddProductDetail = document.getElementById('btn-add-edit');
    if (btnAddProductDetail) {
      btnAddProductDetail.innerHTML = 'Cập nhật chi tiết sản phẩm';
    }
  }

  private initProductDetails(productDetails: any) {
    for (let i = 0; i < productDetails.length; i++) {
      const productDetail = {
        id: productDetails[i].id,
        colorId: productDetails[i].color.id,
        sizeId: productDetails[i].size.id,
        colorName: this.colors.find(color => color.id == productDetails[i].color.id),
        sizeName: this.sizes.find(size => size.id == productDetails[i].size.id),
        quantity: productDetails[i].quantity,
        inputPrice: productDetails[i].inputPrice,
        sellPrice: productDetails[i].sellPrice,
      };
      this.productDetails.push(productDetail);
      console.log(productDetails);
    }
  }
}
