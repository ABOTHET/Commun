import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleDoesNotExists extends HttpException {
  constructor() {
    super("Данной роли не существует", HttpStatus.BAD_REQUEST);
  }
}