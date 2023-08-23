import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssignRoleDto {
  @IsNotEmpty({ message: "Название роли не может быть пустым" })
  @ApiProperty()
  role: string;
  @ApiProperty()
  @IsNotEmpty({ message: "Email не может быть пустым" })
  email: string;
}