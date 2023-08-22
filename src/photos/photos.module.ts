import { Module } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { PhotosController } from "./photos.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Photo } from "./models/photos.model";

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
  imports: [SequelizeModule.forFeature([Photo])],
  exports: [PhotosService]
})
export class PhotosModule {}
