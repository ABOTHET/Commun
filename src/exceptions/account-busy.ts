import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountBusy extends HttpException {
  constructor() {
    super("Данный аккаунт уже занят", HttpStatus.BAD_REQUEST);
  }
}