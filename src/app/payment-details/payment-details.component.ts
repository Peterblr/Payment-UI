import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
currentRecord: PaymentDetail;
  constructor(public service: PaymentDetailService,
      private toastr: ToastrService  
    ) { }

  list: PaymentDetail[] = [];
  p: number = 1;
  perPage: number = 5;
  totalRecords: any;

  ngOnInit(): void {
    this.service.getAllPayments().subscribe((res: any) => {
      this.list = res;
      this.totalRecords = res.length;
    });
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.currentRecord = selectedRecord;
    this.service.registerForm.patchValue(selectedRecord);
  }

  onDelete(id: number) {
    this.service.deletePayment(id).subscribe(res => {
      this.service.refreshList();      
    },
    err => {console.log(err)});
    this.toastr.error("Deleted Successfully");
  }
}
