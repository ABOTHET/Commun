import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Неккоректный email" })
  @IsNotEmpty({ message: "Email не может быть пустым" })
  email: string;
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(6, { message: "Пароль должен состоять из 6 символов и больше" })
  password: string;
}