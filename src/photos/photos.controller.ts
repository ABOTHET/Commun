import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Payload as Pd } from "../jwt-refresh-tokens/payload/payload";
import { Payload } from "../decorators/account/payload.decorator";
import { PhotosService } from "./photos.service";
import { createReadStream } from "fs";

@Controller("photos")
export class PhotosController {

  constructor(private photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("photos", 10))
  async uploadFiles(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: "png"
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
  ) files: Array<Express.Multer.File>, @Payload() payload: Pd) {
    const email = payload.email;
    const account_id = payload.id;
    await this.photosService.addPhotos(account_id, email, files);
  }

  @Get("/:id")
  @Header("Content-Type", "image/webp")
  async findPhotoById(@Param("id") id: string) {
    // в папке "/photos" отсчёт идёт с 0, а в БД отсчёт идёт с 1, поэтому ув.
    const number = Number(id) + 1;
    const photo = await this.photosService.findPhotoById(number);
    if (!photo) {
      return;
    }
    const file = createReadStream(photo.path);
    return new StreamableFile(file);
  }

}
