import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/Product";
import {ProductService} from "../../../services/product.service";
import {RouterLink} from "@angular/router";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    MatPaginatorModule,
    SlicePipe,
    FormsModule,
    CurrencyPipe,
    RouterLink
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';

  constructor(
    private productService: ProductService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Dữ liệu trả về ở "result", ta cần lấy đối tượng bên trong
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

  deleteProduct(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa sản phẩm',
        `Bạn có chắc chắn muốn xóa sản phẩm này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== id);
              this.dialogService.notificationOpen('Thông báo', 'Xóa sản phẩm thành công!', 'OK');
              console.log('Product deleted:', id);
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
