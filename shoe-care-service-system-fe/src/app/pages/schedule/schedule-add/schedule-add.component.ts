import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Client} from "../../../model/Client";
import {ClientService} from "../../../services/client.service";
import {DialogService} from "../../../services/dialog.service";
import {ScheduleService} from "../../../services/schedule.service";
import {ColorService} from "../../../services/color.service";
import {SizeService} from "../../../services/size.service";
import {BrandService} from "../../../services/brand.service";
import {MaterialService} from "../../../services/material.service";
import {ServiceCareService} from "../../../services/service-care.service";
import {Material} from "../../../model/Material";
import {Brand} from "../../../model/Brand";
import {Color} from "../../../model/Color";
import {Size} from "../../../model/Size";
import {Service} from "../../../model/Service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {
  phoneSearch: string = '';
  clientSelected: Client | null = null;
  clients: Client[] = [];
  paymentMethods = ['CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'MOBILE_WALLET'];
  selectedPaymentMethod: string = 'CASH';
  totalPrice: number = 0;
  canAdd: boolean = false;
  scheduleForm: FormGroup;
  materials: Material[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentUser: any = null;
  sizes: Size[] = [];
  services: Service[] = [];

  ngOnInit(): void {
    this.loadMaterials();
    this.loadBrands();
    this.loadColors();
    this.loadSizes();
    this.loadServices();
    this.loadClients();
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.currentUser = data.result;
      },
      error: (err) => {
        console.error('Error when load profile:', err);
      }
    });
  }

  constructor(
    private scheduleService: ScheduleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private brandService: BrandService,
    private materialService: MaterialService,
    private shoeService: ServiceCareService
  ) {
    this.scheduleForm = this.formBuilder.group({
      materialId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      shoeServiceInput: [[], Validators.required],
      paid: [0, [Validators.required, Validators.min(0)]],
      note: ['', Validators.required]
    });
    this.scheduleForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    const selectedServiceIds = this.scheduleForm.get('shoeServiceInput')?.value;
    if (selectedServiceIds && selectedServiceIds.length > 0) {
      this.totalPrice = selectedServiceIds.reduce((total: number, serviceId: number) => {
        const service = this.services.find(s => s.id === serviceId);
        return service ? total + service.price : total;
      }, 0);
    } else {
      this.totalPrice = 0;
    }
  }

  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data.result;
        console.log('Loaded materials:', data);
      },
      error: (err) => {
        console.error('Error when loading materials:', err);
      }
    });
  }

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data.result;
        console.log('Loaded brands:', data);
      },
      error: (err) => {
        console.error('Error when loading brands:', err);
      }
    });
  }

  loadColors() {
    this.colorService.getColors().subscribe({
      next: (data) => {
        this.colors = data.result;
        console.log('Loaded colors:', data);
      },
      error: (err) => {
        console.error('Error when loading colors:', err);
      }
    });
  }

  loadSizes() {
    this.sizeService.getSizes().subscribe({
      next: (data) => {
        this.sizes = data.result;
        console.log('Loaded sizes:', data);
      },
      error: (err) => {
        console.error('Error when loading sizes:', err);
      }
    });
  }

  loadServices() {
    this.shoeService.getServices().subscribe({
      next: (data) => {
        this.services = data.result;
        this.services = this.services.filter(service => service.isActive);
        console.log('Loaded services:', this.services);
      },
      error: (err) => {
        console.error('Error when loading services:', err);
      }
    });
  }

  addSchedule() {
    const selectedServiceIds = this.scheduleForm.value.shoeServiceInput;
    const scheduleData = {
      clientId: this.clientSelected?.id,
      userId: this.currentUser.id,
      materialId: this.scheduleForm.value.materialId,
      brandId: this.scheduleForm.value.brandId,
      paymentType: this.selectedPaymentMethod,
      colorId: this.scheduleForm.value.colorId,
      sizeId: this.scheduleForm.value.sizeId,
      paid: this.scheduleForm.value.paid,
      cost: this.totalPrice,
      discount: this.disCountClient,
      note: this.scheduleForm.value.note,
      shoeServiceIds: selectedServiceIds
    };

    this.scheduleService.addSchedule(scheduleData).subscribe({
      next: (response) => {
        this.dialogService.notificationOpen('Thành công', 'Thêm lịch hẹn thành công!');
        console.log('Schedule added:', response);
        this.scheduleForm.reset();
        this.totalPrice = 0;
      },
      error: (err) => {
        this.dialogService.notificationOpen('Lỗi', 'Có lỗi xảy ra khi thêm lịch hẹn!');
        console.error('Error when adding schedule:', err);
      }
    });
  }

  getPaymentMethod(paymentType: string): string {
    switch (paymentType) {
      case 'CASH':
        return 'Tiền mặt';
      case 'CREDIT_CARD':
        return 'Thẻ tín dụng';
      case 'BANK_TRANSFER':
        return 'Chuyển khoản ngân hàng';
      case 'MOBILE_WALLET':
        return 'Ví điện tử';
      default:
        return 'Không xác định';
    }
  }

  getClient() {
    if (this.phoneSearch.trim() === '') {
      return;
    }
    const foundClient = this.clients.find((client) => client.tel === this.phoneSearch);

    if (foundClient) {
      this.clientSelected = foundClient;
      this.canAdd = true;
    } else {
      this.dialogService.notificationOpen('Thông báo', 'Không tìm thấy khách hàng!');
    }
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Clients:', data);
        this.clients = data.result;
      },
      error: (err) => {
        console.error('Error when loading clients:', err);
      }
    });
  }

  get disCountClient(): number {
    if (!this.clientSelected || this.clientSelected.clientCategoryTotalRequire >= this.totalPrice) {
      return 0;
    }
    return this.clientSelected.clientCategoryDiscountType === 'percent'
      ? this.totalPrice * this.clientSelected.clientCategoryDiscount / 100
      : this.clientSelected.clientCategoryDiscount;
  }

  get finalPrice(): number {
    return this.totalPrice - this.disCountClient
  }
}
