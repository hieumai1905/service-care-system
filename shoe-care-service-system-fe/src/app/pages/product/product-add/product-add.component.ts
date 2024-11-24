import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ColorService} from '../../../services/color.service';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProductService} from "../../../services/category-product.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Color} from "../../../model/Color";
import {Size} from "../../../model/Size";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        RouterLink,
        DatePipe,
        SlicePipe,
        MatPaginatorModule,
        CurrencyPipe
    ]
})
export class ProductAddComponent implements OnInit {
    productForm: FormGroup;
    productCategories: any[] = [];
    message: string = '';
    sizes: Size[] = [];
    colors: Color[] = [];
    selectedFile: File | null = null;
    imagePreview: string | undefined;
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
        private dialogService: DialogService
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
            formData.append('status', this.productForm.get('status')?.value);
            formData.append('description', this.productForm.get('description')?.value);
            formData.append('productCategoryId', this.productForm.get('productCategoryId')?.value);
            formData.append('productDetails', JSON.stringify(this.productDetails));

            this.productService.addProduct(formData).subscribe({
                next: () => {
                    this.dialogService.notificationOpen('Thông báo', 'Thêm sản phẩm thành công!', 'OK');
                    this.productForm.reset();
                    this.imagePreview = undefined;
                    this.selectedFile = null;
                    const imageInput = document.getElementById('image') as HTMLInputElement;
                    imageInput.value = '';
                    this.productDetails = [];
                    this.resetProductDetailForm();
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
        const btnAddProductDetail = document.getElementById('btn-add-edit');
        if (btnAddProductDetail) {
            btnAddProductDetail.innerHTML = 'Cập nhật chi tiết sản phẩm';
        }
    }
}
