import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {

  @IsNotEmpty({ message: "Название роли не может быть пустым" })
  role: string;

  constructor(role: string) {
    this.role = role;
  }

}