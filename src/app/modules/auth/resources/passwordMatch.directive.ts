import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')
  const newUser = control.get('newUser')
  return newUser && newUser.value && password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null
}


@Directive({
  selector: '[passwordsMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: passwordsMatchDirective, multi: true }]
})
export class passwordsMatchDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return passwordsMatch(control)
  }
}
