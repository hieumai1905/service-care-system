import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-size-add',
  templateUrl: './size-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./size-add.component.css']
})
export class SizeAddComponent {
  sizeForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private sizeService: SizeService,
    private dialogService: DialogService
  ) {
    this.sizeForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([1-7]?[0-9](\.5)?|80)$/)  // Allows sizes from 1-80 and .5 increments
        ]
      ]
    });
  }

  addSize() {
    if (this.sizeForm.valid) {
      const sizeData = {
        name: this.sizeForm.value.name
      };

      this.sizeService.addSize(sizeData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm size thành công!', 'OK');
          this.sizeForm.reset();
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
