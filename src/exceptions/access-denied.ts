import { HttpException, HttpStatus } from "@nestjs/common";

export class AccessDenied extends HttpException {
  constructor() {
    super("Недостаточно прав", HttpStatus.BAD_REQUEST);
  }
}