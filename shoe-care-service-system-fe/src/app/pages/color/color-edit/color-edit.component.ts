import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ColorService} from '../../../services/color.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {
  colorForm: FormGroup;
  message: string = '';
  colorId: number | undefined;
  selectedColor: string = '#FFFFFF';
  previousValidColor: string = this.selectedColor;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.colorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      colorHex: [this.selectedColor, [Validators.required, this.hexValidator]]
    });
  }

  ngOnInit() {
    this.colorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadColorDetails();
  }

  loadColorDetails() {
    if (this.colorId === undefined) {
      return;
    }
    this.colorService.findById(this.colorId).subscribe({
      next: (data) => {
        this.colorForm.patchValue({
          name: data.result.name,
          colorHex: data.result.colorHex
        });
        this.selectedColor = data.result.colorHex;
        this.previousValidColor = this.selectedColor;
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  hexValidator(control: any): { [key: string]: boolean } | null {
    const validHex = /^#[0-9A-F]{6}$/i.test(control.value);
    return validHex ? null : {invalidHex: true};
  }

  validateHex() {
    const hexValue = this.colorForm.get('colorHex')?.value;
    if (hexValue === '') {
      this.selectedColor = '#FFFFFF';
      this.colorForm.get('colorHex')?.setValue(this.selectedColor);
    } else if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      this.selectedColor = hexValue;
      this.previousValidColor = hexValue;
    }
  }

  onColorInput(event: any) {
    this.selectedColor = event.target.value;
    this.colorForm.get('colorHex')?.setValue(this.selectedColor);
    this.previousValidColor = this.selectedColor;
  }

  onBlurHexInput() {
    const hexValue = this.colorForm.get('colorHex')?.value;
    if (!/^#[0-9A-F]{6}$/i.test(hexValue)) {
      this.colorForm.get('colorHex')?.setValue(this.previousValidColor);
      this.selectedColor = this.previousValidColor;
    } else {
      this.previousValidColor = hexValue;
    }
  }

  updateColor() {
    if (this.colorForm.valid && this.colorId !== undefined) {
      const colorData = {
        id: this.colorId,
        name: this.colorForm.value.name,
        colorHex: this.colorForm.value.colorHex
      };

      this.colorService.updateColor(colorData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật màu sắc thành công!', 'OK');
          this.colorForm.reset({colorHex: '#FFFFFF'});
          this.selectedColor = '#FFFFFF';
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
