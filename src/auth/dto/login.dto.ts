import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsEmail({}, { message: "Неккоректный email" })
  @IsNotEmpty({ message: "Email не может быть пустым" })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(6, { message: "Пароль должен состоять из 6 символов и больше" })
  @ApiProperty({description: "Пароль должен состоять из 6 символов и больше"})
  password: string;
}