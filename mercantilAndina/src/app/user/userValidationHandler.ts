import * as messages from '../../messages';
import parsePhoneNumber from 'libphonenumber-js';

export class UserValidationsHandler {

  constructor(){}

  validateUserDni(dni: string): boolean{
    if (!dni){throw new Error(messages.get('ErrorValidateUserDni')); }
    if (dni.length < 7){throw new Error(messages.get('ErrorUserDniToShort')); }
    if (dni.length > 8){throw new Error(messages.get('ErrorUserDniToLong')); }
    if (!/^\d+$/.test(dni)){throw new Error(messages.get('ErrorUserDniNaN')); }
    return true;
  }

  validateUserApellido(apellido: string): boolean{
    if (!apellido){throw new Error(messages.get('ErrorValidateUserApellido')); }
    if (apellido.length < 2){throw new Error(messages.get('ErrorUserApellidoToShort')); }
    if (apellido.length > 15){throw new Error(messages.get('ErrorUserApellidoToLong')); }
    if (!/^[a-zA-Z]+$/.test(apellido)){throw new Error(messages.get('ErrorUserApellidoOnlyChar')); }
    return true;
  }

  validateUserNombre(nombre: string): boolean{
    if (!nombre){throw new Error(messages.get('ErrorValidateUserNombre')); }
    if (nombre.length < 2){throw new Error(messages.get('ErrorUserNombreToShort')); }
    if (nombre.length > 15){throw new Error(messages.get('ErrorUserNombreToLong')); }
    if (!/^[a-zA-Z]+$/.test(nombre)){throw new Error(messages.get('ErrorUserNombreOnlyChar')); }
    return true;
  }

  validateUserEmail(email: string): boolean{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email){throw new Error(messages.get('ErrorValidateUserEmail')); }
    if (!re.test(String(email).toLowerCase())){throw new Error(messages.get('ErrorUserEmailFormat')); }
    return true;
  }

  validateUserPhone(phoneNo: string): boolean{
    const phoneNumber = parsePhoneNumber(phoneNo, 'AR');
    if (!phoneNumber.isValid()){throw new Error(messages.get('ErrorValidateUserPhone')); }
    return true;
  }

  validateFechNac(birthDate: Date): boolean{
    if (!birthDate){throw new Error(messages.get('ErrorValidateUserBirthDay')); }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18){throw new Error(messages.get('ErrorValidateUserBirthDayToYoung')); }
    if (age > 99){throw new Error(messages.get('ErrorValidateUserBirthDayToOld')); }
    return true;
  }

  async validateUserName(userName): Promise<boolean>{
    if (!userName){throw new Error(messages.get('ErrorValidUserName')); }
    if (userName.length < 3){throw new Error(messages.get('ErrorValidUserNameToShort')); }
    if (userName.length > 30){throw new Error(messages.get('ErrorValidUserNameToLong')); }
    return true;
  }

  validateUserVehicleYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    if (year && (currentYear - year) < 21) {
      return true;
    }
    throw new Error(messages.get('ErrorCarModelYear'));
  }

  validateUserPasswordStrength(password: string): boolean{
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8}$/;
    if (!password){throw new Error(messages.get('ErrorValidateUserPassword')); }
    if (!re.test(password)){throw new Error(messages.get('ErrorValidateUserPasswordStrength')); }
    return true;
  }

}
