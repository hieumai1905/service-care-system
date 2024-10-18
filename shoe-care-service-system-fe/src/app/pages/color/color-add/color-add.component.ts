import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ColorService} from '../../../services/color.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ColorAddComponent {
  colorForm: FormGroup;
  message: string = '';
  selectedColor: string = '#FFFFFF';
  previousValidColor: string = this.selectedColor;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private dialogService: DialogService
  ) {
    this.colorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      colorHex: [this.selectedColor, [Validators.required, this.hexValidator]]
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

  addColor() {
    if (this.colorForm.valid) {
      const colorData = {
        name: this.colorForm.value.name,
        colorHex: this.colorForm.value.colorHex
      };

      this.colorService.addColor(colorData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm màu sắc thành công!', 'OK');
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
