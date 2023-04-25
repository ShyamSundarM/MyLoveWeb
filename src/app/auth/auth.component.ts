import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, AfterViewInit {
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
}
