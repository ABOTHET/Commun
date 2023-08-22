import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountDoesNotExists extends HttpException {
  constructor() {
    super("Данного аккаунта не существует", HttpStatus.BAD_REQUEST);
  }
}