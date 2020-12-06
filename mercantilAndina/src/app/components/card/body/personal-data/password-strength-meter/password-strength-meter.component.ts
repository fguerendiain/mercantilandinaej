import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserValidationsHandler } from '../../../../../user/userValidationHandler';

@Component({
  selector: 'app-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.css']
})
export class PasswordStrengthMeterComponent implements OnInit {

  @Input() passwordInput: string;

  pillClass = 'baseClass ';
  weakClass: string;
  mediumClass: string;
  strongClass: string;

  constructor(private validator: UserValidationsHandler) { }

  ngOnInit(): void {
    this.weakClass = this.setClass('blank');
    this.mediumClass = this.setClass('blank');
    this.strongClass = this.setClass('blank');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkStrength(changes.passwordInput.currentValue);

  }

  checkStrength(pass: string): void{
    const score = this.validator.validateUserPasswordStrengthScore(pass);
    if (pass !== '' && score <= 9){
      this.weakClass = this.setClass('weak');
      this.mediumClass = this.setClass('blank');
      this.strongClass = this.setClass('blank');
    }else if (score > 9 && score <= 12 ){
      this.weakClass = this.setClass('medium');
      this.mediumClass = this.setClass('medium');
      this.strongClass = this.setClass('blank');
    }else if (score > 12){
      this.weakClass = this.setClass('strong');
      this.mediumClass = this.setClass('strong');
      this.strongClass = this.setClass('strong');
    }else {
      this.resetIndicators();
    }
  }

  setClass(customClass: string): string{
    return this.pillClass + customClass;
  }

  resetIndicators(): void{
    this.weakClass = this.setClass('blank');
    this.mediumClass = this.setClass('blank');
    this.strongClass = this.setClass('blank');
  }

}
