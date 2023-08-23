import { Allow, IsEmpty, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

  @IsNotEmpty({ message: "account_id не может быть пустым" })
  @ApiProperty()
  account_id: number;
  @IsNotEmpty({ message: "Название поста не может быть пустым" })
  @ApiProperty()
  title: string;
  @Allow()
  @ApiProperty({description: "Может быть пустым"})
  description: string;
  @Allow()
  @ApiProperty({description: "Может быть пустым"})
  photos_id: number[] = [];

  constructor(account_id: number, title: string, description: string = "", photos_id: number[] = []) {
    this.account_id = account_id;
    this.title = title;
    this.description = description;
    this.photos_id = photos_id;
  }

}