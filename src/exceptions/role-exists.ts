import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleExists extends HttpException {
  constructor() {
    super("Данная роль уже существует", HttpStatus.BAD_REQUEST);
  }
}