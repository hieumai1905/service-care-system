import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DialogService} from "../../../services/dialog.service";
import {NgForOf, NgIf} from "@angular/common";
import {ClientCategoryService} from "../../../services/client-category.service";
import {ClientCategory} from "../../../model/ClientCategory";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgForOf
  ]
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;
  message: string = '';
  clientId: string = '';
  clientCategories: Array<ClientCategory> = [];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private clientCategoryService: ClientCategoryService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tel: [''],
      createAt: [new Date()],
      email: [''],
      address: ['', [Validators.required]],
      note: [''],
      birthday: ['', [Validators.required]],
      clientCategoryId: [0, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadClientCategories();
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('id') || '';
      if (this.clientId) {
        this.loadClient(Number(this.clientId));
      }
    });
  }

  loadClientCategories() {
    this.clientCategoryService.getClientCategories().subscribe({
      next: (data) => {
        this.clientCategories = data.result;
      },
      error: (err) => {
        console.error('Error loading client categories:', err);
      }
    });
  }

  loadClient(id: number) {
    this.clientService.findById(id).subscribe({
      next: (data) => {
        const client = data.result;
        console.log('client:', client);
        this.clientForm.patchValue({
          name: client.name,
          tel: client.tel,
          address: client.address,
          email: client.email,
          birthday: client.birthday ? this.formatDate(client.birthday) : '',
          note: client.note,
          clientCategoryId: client.clientCategoryId
        });
      },
      error: (err) => {
        console.error('Error loading client:', err);
      }
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  updateClient() {
    if (this.clientForm.valid) {
      const updatedClient = this.clientForm.getRawValue();
      updatedClient.id = Number(this.clientId);
      console.log('updatedClient:', updatedClient);
      this.clientService.updateClient(updatedClient).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật khách hàng thành công!', 'OK');
          this.router.navigate(['/clients']);
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
