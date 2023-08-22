import { IsNotEmpty } from "class-validator";

export class CreatePhotosDto {

  @IsNotEmpty({ message: "account_id не может быть пустым" })
  account_id: number;
  @IsNotEmpty({ message: "path не может быть пустым" })
  path: string;

  constructor(account_id: number, path: string) {
    this.account_id = account_id;
    this.path = path;
  }

}