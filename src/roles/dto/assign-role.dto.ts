import { IsNotEmpty } from "class-validator";

export class AssignRoleDto {
  @IsNotEmpty({ message: "Название роли не может быть пустым" })
  role: string;
  @IsNotEmpty({ message: "Email не может быть пустым" })
  email: string;
}