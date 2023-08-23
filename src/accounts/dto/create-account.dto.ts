import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
  @IsEmail({}, { message: "Неккоректный email" })
  @IsNotEmpty({ message: "Email не может быть пустым" })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(6, { message: "Пароль должен состоять из 6 символов и больше" })
  @ApiProperty({description: "Пароль должен состоять из 6 символов и больше"})
  password: string;
  @IsNotEmpty({ message: "Имя не может быть пустым" })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: "Фамилия не может быть пустым" })
  @ApiProperty()
  surname: string;
  @IsNotEmpty({ message: "Возраст не может быть пустым" })
  @Min(6, { message: "Ваш возраст должен быть больше 6 лет" })
  @ApiProperty({description: "Ваш возраст должен быть больше 6 лет"})
  age: number;
}