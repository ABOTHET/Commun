import { Min } from "class-validator";

export class ChangeDataDto {
  name: string;
  surname: string;
  @Min(6, { message: "Ваш возраст должен быть больше 6 лет" })
  age: number;
}