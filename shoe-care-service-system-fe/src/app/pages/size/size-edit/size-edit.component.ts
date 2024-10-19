import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SizeService} from '../../../services/size.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-size-edit',
  templateUrl: './size-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./size-edit.component.css']
})
export class SizeEditComponent implements OnInit {
  sizeForm: FormGroup;
  message: string = '';
  sizeId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private sizeService: SizeService,
    private dialogService: DialogService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.sizeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSizeDetails();
  }

  loadSizeDetails() {
    if (this.sizeId === undefined) {
      return;
    }
    this.sizeService.findById(this.sizeId).subscribe({
      next: (data) => {
        this.sizeForm.patchValue({
          name: data.result.name
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  updateSize() {
    if (this.sizeForm.valid && this.sizeId !== undefined) {
      const sizeData = {
        id: this.sizeId,
        name: this.sizeForm.value.name
      };

      this.sizeService.updateSize(sizeData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật kích cỡ thành công!', 'OK');
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
