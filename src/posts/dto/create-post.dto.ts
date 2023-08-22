import { Allow, IsEmpty, IsNotEmpty } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty({ message: "account_id не может быть пустым" })
  account_id: number;
  @IsNotEmpty({ message: "Название поста не может быть пустым" })
  title: string;
  @Allow()
  description: string;
  @Allow()
  photos_id: number[] = [];

  constructor(account_id: number, title: string, description: string = "", photos_id: number[] = []) {
    this.account_id = account_id;
    this.title = title;
    this.description = description;
    this.photos_id = photos_id;
  }

}