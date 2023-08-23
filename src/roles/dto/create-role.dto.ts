import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

  @IsNotEmpty({ message: "Название роли не может быть пустым" })
  @ApiProperty()
  role: string;

  constructor(role: string) {
    this.role = role;
  }

}