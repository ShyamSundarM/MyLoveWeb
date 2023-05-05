import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterResponse } from '../models/RegisterResponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements AfterViewInit {
  showRegOverlay: boolean = false;
  loginStatusMessage!: string;
  isLoading: boolean = false;
  regResult!: any;
  temp = { name: '' };
  rePwdVar!: string;
  pwdVar!: string;
  constructor(private eleRef: ElementRef, private authService: AuthService) {}
  ngAfterViewInit(): void {
    this.eleRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#c7c7c7';
  }

  loginMode: boolean = true;

  onAuthNavClick(prop: boolean, event: Event) {
    event.preventDefault();
    if (prop) this.loginMode = true;
    else this.loginMode = false;
  }

  onRegisterFormSubmit(form: any) {
    //console.log(form.form.controls['re-pwd'].errors);
    if (form.form.valid) {
      this.isLoading = true;
      form.form.disable();

      var formData = form.form.value;
      delete formData['re-pwd'];

      this.authService
        .registerUser(form.form.value)
        .pipe(
          catchError((err) => {
            form.form.enable();
            let status = '';
            if (err.status === 0) status = 'Network / Server issue';
            else status = 'Failed';
            this.isLoading = false;
            this.regResult = { isSuccess: false, status: status };
            this.showRegOverlay = true;
            return throwError(() => new Error('Unknown Error Occured'));
          })
        )
        .subscribe((resp) => {
          this.isLoading = false;
          this.regResult = resp;
          this.showRegOverlay = true;
          form.form.enable();
          if (resp.IsSuccess) {
          } else {
          }
        });
    }
  }

  onLoginFormSubmit(form: any) {
    this.isLoading = true;
    form.form.disable();
    this.authService
      .loginUser(form.form.value)
      .pipe(
        catchError((err, c) => {
          if (err.status === 0) {
            this.loginStatusMessage = 'Network / Server issue';
          } else if (err.status === 401) {
            this.loginStatusMessage = 'Invalid email or password';
          }
          this.isLoading = false;
          form.form.enable();
          return throwError(() => new Error('Some Error Occured'));
        })
      )
      .subscribe((resp) => {
        if (resp.token) {
          this.loginStatusMessage = 'Login Success';
        }
        this.isLoading = false;
        form.form.enable();
        console.log(resp.token);
      });
  }
}
