import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  registerForm: FormGroup = new FormGroup({
    cardOwnerName: new FormControl(''),
    cardNumber: new FormControl(''),
    expirationDate: new FormControl(''),
    securityCode: new FormControl(''),
  });

  temp = false;
  
  constructor(private http: HttpClient) { }

  baseurl = "https://localhost:7152/api/PaymentDetails/";  

  createPayment(paymentDetail: PaymentDetail) {
    let url = this.baseurl + "CreatePayment";
    return this.http.post(url, paymentDetail);
  };

  getAllPayments() {
    let url = this.baseurl + "GetAllPayments";
    return this.http.get(url);
  };

  updatePayment(id: number, paymentDetail: PaymentDetail) {
    let url = this.baseurl + "UpdatePayment/" + id;
    return this.http.put(url, paymentDetail);
  }

  deletePayment(id: number) {
    let url = this.baseurl + "DeletePayment/" + id;
    return this.http.delete(url);
  }

  refreshList() {
    window.location.reload();
    this.temp = true;
  }
}
