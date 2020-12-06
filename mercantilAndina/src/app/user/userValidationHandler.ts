import * as messages from '../../messages.json';
import parsePhoneNumber from 'libphonenumber-js';
import { Injectable } from '@angular/core';
import { ApiMockMercantilAndinaService } from '../services/ApiMockMercantilAndina.service';

@Injectable({ providedIn: 'root' })
export class UserValidationsHandler {

  constructor(private service: ApiMockMercantilAndinaService){}

  validateUserDni(dni: string): boolean{
    if (!dni){throw new Error(messages.ErrorValidateUserDni); }
    if (dni.length < 7){throw new Error(messages.ErrorUserDniToShort); }
    if (dni.length > 8){throw new Error(messages.ErrorUserDniToLong); }
    if (!/^\d+$/.test(dni)){throw new Error(messages.ErrorUserDniNaN); }
    return true;
  }

  validateUserApellido(apellido: string): boolean{
    if (!apellido){throw new Error(messages.ErrorValidateUserApellido); }
    if (apellido.length < 2){throw new Error(messages.ErrorUserApellidoToShort); }
    if (apellido.length > 15){throw new Error(messages.ErrorUserApellidoToLong); }
    if (!/^[a-zA-Z\s]+$/.test(apellido)){throw new Error(messages.ErrorUserApellidoOnlyChar); }
    return true;
  }

  validateUserNombre(nombre: string): boolean{
    if (!nombre){throw new Error(messages.ErrorValidateUserNombre); }
    if (nombre.length < 2){throw new Error(messages.ErrorUserNombreToShort); }
    if (nombre.length > 15){throw new Error(messages.ErrorUserNombreToLong); }
    if (!/^[a-zA-Z\s]+$/.test(nombre)){throw new Error(messages.ErrorUserNombreOnlyChar); }
    return true;
  }

  validateUserEmail(email: string): boolean{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email){throw new Error(messages.ErrorValidateUserEmail); }
    if (!re.test(String(email).toLowerCase())){throw new Error(messages.ErrorUserEmailFormat); }
    return true;
  }

  validateUserPhone(phoneNo: string): boolean{
    const phoneNumber = parsePhoneNumber(phoneNo, 'AR');
    if (!phoneNumber?.isValid()){throw new Error(messages.ErrorValidateUserPhone); }
    return true;
  }

  validateFechNac(inputDate: string): boolean{
    if (!inputDate){throw new Error(messages.ErrorValidateUserBirthDay); }
    const birthDate = this.formatDate(inputDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18){throw new Error(messages.ErrorValidateUserBirthDayToYoung); }
    if (age > 99){throw new Error(messages.ErrorValidateUserBirthDayToOld); }
    return true;
  }

  async validateUserName(userName): Promise<boolean>{
    const isValid = await this.service.getUserNameAvailability(userName);
    if (!userName){throw new Error(messages.ErrorValidUserName); }
    if (userName.length < 3){throw new Error(messages.ErrorValidUserNameToShort); }
    if (userName.length > 30){throw new Error(messages.ErrorValidUserNameToLong); }
    if (!isValid){throw new Error(messages.ErrorValidUserNameFalse); }
    return true;
  }

  validateUserVehicleYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    if (year && (currentYear - year) < 21) {
      return true;
    }
    throw new Error(messages.ErrorCarModelYear);
  }

  validateUserPasswordStrength(inputPassword: string): boolean{
    if (!inputPassword){throw new Error(messages.ErrorValidateUserPassword); }
    const score = this.validateUserPasswordStrengthScore(inputPassword);
    if (score < 12 ){throw new Error(messages.ErrorValidateUserPasswordStrength); }
    return true;
  }

  validateUserPasswordStrengthScore(inputPassword: string): number{
    let score = 0;
    const digits = /\d/;
    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const nonWords = /\W/;
    const length = inputPassword?.length ?? 0;

    if (digits.test(inputPassword)){score += 3; }
    if (lower.test(inputPassword)){score += 3; }
    if (upper.test(inputPassword)){score += 3; }
    if (nonWords.test(inputPassword)){score += 3; }
    if (length > 7){score += 3; }

    return score;
  }


  formatDate(date: string): Date{
    const year: number = +date.split('-')[0];
    const month: number = +date.split('-')[1] - 1;
    const day: number = +date.split('-')[2];

    return new Date (year, month, day);
  }

  stringifyDate(date: Date): string{
    if (date){
      const year: string = date.getFullYear().toString();
      let month: string = (date.getMonth() + 1).toString();
      let day: string = date.getDate().toString();
      if (day.length < 2){ day = '0' + day; }
      if (month.length < 2){ month = '0' + month; }

      return `${year}-${month}-${day}`;
    }
    return null;
  }

}
