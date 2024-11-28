import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../model/Product";
import {ProductService} from "../../../services/product.service";
import {DialogService} from "../../../services/dialog.service";
import {RouterLink} from "@angular/router";
import {Size} from "../../../model/Size";
import {Color} from "../../../model/Color";
import {SizeService} from "../../../services/size.service";
import {ColorService} from "../../../services/color.service";
import {forkJoin} from "rxjs";
import {ProductDetailService} from "../../../services/product-detail.service";
import {OrderItem} from "../../../model/OrderItem";

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatPaginatorModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    SlicePipe,
    RouterLink,
    FormsModule
  ],
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  products: Array<Product> = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  searchKey: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  availableQuantity: number = 0;
  selectedProduct: any;
  canAddToOrder: any;
  sizesProduct: Size[] = [];
  colorsProduct: Color[] = [];
  currentPrice: string = '';
  selectedQuantity: number | null = null;
  selectedQuantityInvalid: boolean = false;
  productDetailId: number = 0;
  carts: OrderItem[] = [];
  protected readonly Number = Number;


  constructor(
    private productService: ProductService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private productDetailService: ProductDetailService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.result;
        console.log('Loaded products:', this.products);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchProduct() {
    if (this.searchKey.trim() === '') {
      this.loadProducts();
      return;
    }
    this.productService.searchProduct(this.searchKey).subscribe({
      next: (data) => {
        this.products = data.result;
        console.log('Loaded product search:', this.products);
      },
      error: (err) => {
        console.error('Error searching products:', err);
      }
    });
  }

  viewProductDetails(product: Product) {
    this.selectedProduct = product;
    this.availableQuantity = product.quantity;
    this.currentPrice = (product.rangePrice ?? 0) + ' đ';
    this.getSizesAndColorsProduct(product.id);
  }

  private getSizesAndColorsProduct(productId: number) {
    forkJoin({
      sizes: this.sizeService.findAllByProductId(productId),
      colors: this.colorService.findAllByProductId(productId)
    }).subscribe({
      next: ({sizes, colors}) => {
        this.sizesProduct = sizes.result;
        this.colorsProduct = colors.result;
      },
      error: (err) => {
        console.error('Error fetching sizes or colors:', err);
      }
    });
  }

  onColorOrSizeChange() {
    if (this.selectedColor && this.selectedSize && this.selectedProduct) {
      this.productDetailService.findProductByColorAndSizeAndProductId(
        this.selectedProduct.id,
        Number(this.selectedSize),
        Number(this.selectedColor)
      ).subscribe(data => {
        if (data.result != null) {
          this.availableQuantity = data.result.quantity;
          this.currentPrice = data.result.sellPrice + 'đ';
          this.productDetailId = data.result.id;
          this.checkCanOrder();
        } else {
          this.canAddToOrder = false;
          this.currentPrice = '0 đ';
          this.availableQuantity = 0;
          this.canAddToOrder = false;
        }
      })
    }
  }

  validateQuantity() {
    if (this.selectedQuantity !== null) {
      this.selectedQuantityInvalid =
        this.selectedQuantity < 1 || this.selectedQuantity > this.availableQuantity;
    }
    if (this.selectedQuantityInvalid) {
      this.canAddToOrder = false;
    }
  }

  checkCanOrder() {
    this.validateQuantity();
    this.canAddToOrder = this.selectedProduct && this.selectedSize && this.selectedColor && this.selectedQuantity && !this.selectedQuantityInvalid;
  }

  addToOrder(product: Product) {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');

    const existingOrderItem = carts.find((item: { productId: number; colorId: number; sizeId: number; }) =>
      item.productId === product.id &&
      item.colorId === Number(this.selectedColor) &&
      item.sizeId === Number(this.selectedSize)
    );

    const quantityToAdd = Number(this.selectedQuantity);

    if (existingOrderItem) {
      const newQuantity = existingOrderItem.quantity + quantityToAdd;

      if (newQuantity <= existingOrderItem.quantityAvailable) {
        existingOrderItem.quantity = newQuantity;
        existingOrderItem.totalPrice = existingOrderItem.quantity * existingOrderItem.price;
      } else {
        this.dialogService.notificationOpen('Thông báo', 'Số lượng vượt quá số lượng có sẵn.');
        return;
      }
    } else {
      const orderItem: OrderItem = {
        productDetailId: this.productDetailId,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        colorId: Number(this.selectedColor),
        colorName: this.colorsProduct.find((color) => color.id === Number(this.selectedColor))?.name || '',
        sizeId: Number(this.selectedSize),
        sizeName: this.sizesProduct.find((size) => size.id === Number(this.selectedSize))?.name || '',
        quantity: quantityToAdd,
        price: Number(this.currentPrice.replace('đ', '').replace(/,/g, '')),
        totalPrice: quantityToAdd * Number(this.currentPrice.replace('đ', '').replace(/,/g, '')),
        quantityAvailable: this.availableQuantity
      };
      carts.push(orderItem);
    }

    localStorage.setItem('carts', JSON.stringify(carts));

    this.carts = carts;

    this.dialogService.notificationOpen('Thông báo', 'Đã thêm sản phẩm vào giỏ hàng.');
    this.resetSelection();
  }

  resetSelection() {
    this.selectedColor = '';
    this.selectedSize = '';
    this.selectedQuantity = null;
    (this.selectedProduct.rangePrice ?? 0) + ' đ';
    this.availableQuantity = this.selectedProduct.quantity;
    this.canAddToOrder = false;
  }
}
