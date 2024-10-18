import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialService} from '../../../services/material.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {
  materialForm: FormGroup;
  message: string = '';
  materialId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.materialForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.materialId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMaterialDetails();
  }

  loadMaterialDetails() {
    if (this.materialId === undefined) {
      return;
    }
    this.materialService.findById(this.materialId).subscribe({
      next: (data) => {
        this.materialForm.patchValue({
          name: data.result.name
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  updateMaterial() {
    if (this.materialForm.valid && this.materialId !== undefined) {
      const materialData = {
        id: this.materialId,
        name: this.materialForm.value.name
      };

      this.materialService.updateMaterial(materialData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật chất liệu thành công!', 'OK');
          this.materialForm.reset();
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
