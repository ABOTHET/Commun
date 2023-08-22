import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectPassword extends HttpException {
  constructor() {
    super("Неправильный пароль", HttpStatus.BAD_REQUEST);
  }
}