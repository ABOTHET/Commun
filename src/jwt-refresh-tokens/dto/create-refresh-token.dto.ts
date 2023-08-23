import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRefreshTokenDto {

  @IsNotEmpty({ message: "account_id не может быть пустым" })
  account_id: number;
  @IsNotEmpty({ message: "refresh_token не может быть пустым" })
  refresh_token: string;

  constructor(account_id: number, refresh_token: string) {
    this.account_id = account_id;
    this.refresh_token = refresh_token;
  }
}