import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrls: ['./payment-details-form.component.css']
})
export class PaymentDetailsFormComponent implements OnInit {
  @Input() record: PaymentDetail;
  
  paymentDetail: PaymentDetail;

  constructor(public service: PaymentDetailService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }
  

  ngOnInit(): void {
    this.service.registerForm = this.fb.group({
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      securityCode:['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });  
  }


  onSubmit() {
    if (!this.record)
      this.insertRecord();
    else
      this.updateRecord();
  }

  insertRecord() {
    this.paymentDetail  = {
      paymentDetailId: 0,
      cardOwnerName: this.CardOwnerName.value,
      cardNumber: this.CardNumber.value,
      expirationDate: this.ExpirationDate.value,
      securityCode: this.SecurityCode.value
    };
    this.service.createPayment(this.paymentDetail).subscribe(res => {
      this.service.registerForm.reset();
      this.service.refreshList();
      this.toastr.success('Submitted Successfully!');
    },
    err => {console.log(err)}
    );   
  }

  updateRecord() {
    this.paymentDetail  = {
      paymentDetailId: this.record.paymentDetailId,
      cardOwnerName: this.CardOwnerName.value,
      cardNumber: this.CardNumber.value,
      expirationDate: this.ExpirationDate.value,
      securityCode: this.SecurityCode.value
    };
    this.service.updatePayment(this.paymentDetail.paymentDetailId, this.paymentDetail).subscribe(res => {
      this.service.registerForm.reset();
      this.service.refreshList();
      if(this.service.temp) {
        this.toastr.info('Updated Successfully!');
      }
    },
    err => {console.log(err)}
    ); 
  }

  //#region Get

  get CardOwnerName() : FormControl {
    return this.service.registerForm.get('cardOwnerName') as FormControl;
  }

  get CardNumber() : FormControl {
    return this.service.registerForm.get('cardNumber') as FormControl;
  }

  get ExpirationDate() : FormControl {
    return this.service.registerForm.get('expirationDate') as FormControl;
  }

  get SecurityCode() : FormControl {
    return this.service.registerForm.get('securityCode') as FormControl;
  }
  //#endregion
}
