import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post, Query,
  StreamableFile, UploadedFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Payload as Pd } from "../jwt-refresh-tokens/payload/payload";
import { Payload } from "../decorators/account/payload.decorator";
import { PhotosService } from "./photos.service";
import { createReadStream } from "fs";
import { Public } from "../decorators/public/public.decorator";

@Controller("photos")
export class PhotosController {

  constructor(private photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("photos", 10))
  async uploadPhotos(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: "jpeg"
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
  ) files: Array<Express.Multer.File>, @Payload() payload: Pd) {
    await this.photosService.uploadPhotos(files, payload.email, payload.id);
  }

  @Get(":id")
  @Public()
  @Header('Content-Type', 'image/webp')
  async getAvatarByAccountId(@Param("id") id: number) {
    let path: string = await this.photosService.getAvatarByAccountId(id);
    const file = createReadStream(path);
    return new StreamableFile(file);
  }

  /*@Get("all/:id")
  @Header('Content-Type', 'image/webp')
  async getPhotosByAccountId(@Param("id") id: number) {
    let photos = await this.photosService.getPhotosByAccountId(id);
    const file = createReadStream(path);
    return new StreamableFile(file);
  }*/

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: "jpeg"
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
  ) file: Express.Multer.File, @Payload() payload: Pd) {
    await this.photosService.uploadAvatar(file, payload.email, payload.id);
  }

}
