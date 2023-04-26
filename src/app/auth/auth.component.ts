import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, AfterViewInit {
  rePwdVar!: string;
  constructor(private eleRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.eleRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#c7c7c7';
  }

  loginMode: boolean = true;
  ngOnInit(): void {
    //document.body.style.backgroundColor = '#eee';
  }

  onAuthNavClick(prop: boolean, event: Event) {
    event.preventDefault();
    if (prop) this.loginMode = true;
    else this.loginMode = false;
  }

  onRegisterFormSubmit(form: any, pwd: any) {
    if (form.form.valid) {
    }
    console.log(form.form.controls['re-pwd'].errors);
  }

  onLoginFormSubmit(form: any) {
    console.log(form.value);
  }
  isPwdValid(form: any) {
    if ('re-pwd' in form.form.controls['re-pwd']) return true;
    else return false;
  }
}
