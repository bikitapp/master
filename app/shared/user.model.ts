const validator = require("email-validator");

export class User {
  nombre: string;
  email: string;
  password: string;
  nacimiento: string;
  
  isValidEmail() {
    return validator.validate(this.email);
  }
}
