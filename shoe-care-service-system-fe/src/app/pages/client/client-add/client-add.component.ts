import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client.service';
import {ClientCategoryService} from '../../../services/client-category.service';
import {RouterLink} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ClientCategory} from "../../../model/ClientCategory";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class ClientAddComponent implements OnInit {
  clientForm: FormGroup;
  clientCategories: Array<ClientCategory> = [];
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private clientCategoryService: ClientCategoryService,
    private dialogService: DialogService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tel: ['', [Validators.required]],
      createAt: [new Date()],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      note: [''],
      birthday: ['', [Validators.required, this.dateOfBirthValidator]],
      clientCategoryId: [0, [Validators.required, this.clientCategoryValidator]]
    });
  }

  dateOfBirthValidator(control: any) {
    const currentDate = new Date();
    const dateOfBirth = new Date(control.value);
    console.log('Date of birth:', dateOfBirth);
    console.log('Current date:', currentDate);
    if (dateOfBirth >= currentDate) {
      console.log('Invalid date of birth');
      return {
        dateOfBirthValidator: {
          valid: false
        }
      };
    }
    return null;
  }

  isEmailInvalid(): boolean {
    const emailControl = this.clientForm.get('email');
    return emailControl?.touched && emailControl?.invalid || false;
  }

  clientCategoryValidator(control: any) {
    if (control.value === 0) {
      return {
        clientCategoryValidator: {
          valid: false
        }
      };
    }
    return null;
  }

  ngOnInit() {
    this.loadClientCategories();
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

  addClient() {
    if (this.clientForm.valid) {
      this.clientService.addClient(this.clientForm.value).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm khách hàng thành công!', 'OK');
          this.clientForm.reset();
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
