import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPwdMatchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PwdMatchValidatorDirective,
      multi: true,
    },
  ],
})
export class PwdMatchValidatorDirective implements Validator {
  @Input() appPwdMatchValidator!: HTMLInputElement;
  constructor() {}
  validate(rePwdInput: AbstractControl<any, any>): ValidationErrors | null {
    if (rePwdInput.value !== this.appPwdMatchValidator.value) {
      return { matching: false };
    }
    return null;
  }
}
