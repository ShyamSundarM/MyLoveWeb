import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appAttacher]',
})
export class AttacherDirective {
  constructor(private eleRef: ElementRef) {}

  @HostListener('click') onClick() {
    //console.log(this.eleRef.nativeElement);
  }
}
