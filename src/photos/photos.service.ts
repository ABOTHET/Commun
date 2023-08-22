import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Photo } from "./models/photos.model";
import * as fs from "fs";
import { Express } from "express";
import * as sharp from "sharp";
import { CreatePhotosDto } from "./dto/create-photos.dto";

@Injectable()
export class PhotosService {

  pathToDir: string = "";

  constructor(@InjectModel(Photo) private photosRepository: typeof Photo) {
    let dir = __dirname;
    let pos = 0;
    let path = "";
    // Шаги назад (1 = 2 шага назад -> ../..)
    let num = 1;
    for (let i = dir.length - 1; i >= 0; i--) {
      if (dir[i] != "\\") {
        continue;
      }
      pos = i;
      if (num == 0) {
        break;
      }
      num -= 1;
    }
    for (let i = 0; i <= pos; i++) {
      path += dir[i];
    }
    path += "assets/photos";
    if (!fs.existsSync(path)) {
      try {
        fs.mkdirSync(path, { recursive: true });
      } catch (e) {
        console.log(e);
      }
    }
    this.pathToDir = path;
  }

  async addPhotos(account_id: number, email: string, files: Array<Express.Multer.File>) {
    const path = this.pathToDir + `\\${email}`;
    if (!fs.existsSync(path)) {
      try {
        fs.mkdirSync(path, { recursive: true });
      } catch (e) {
        console.log(e);
      }
    }
    let counter: number;
    try {
      fs.accessSync(path + "\\counter.txt", fs.constants.F_OK);
    } catch (e) {
      try {
        fs.writeFileSync(path + "\\counter.txt", "0", "utf-8");
      } catch (e) {
        console.log(e);
      }
    }
    try {
      let data = fs.readFileSync(path + "\\counter.txt", "utf-8");
      counter = Number(data);
    } catch (e) {
      console.log(e);
    }
    files.forEach((photo) => {
      const pathToPhoto = path + `\\${counter}.webp`;
      sharp(photo.buffer).toFile(pathToPhoto, (err, info) => {});
      counter++;
      const createPhotoDto = { ...new CreatePhotosDto(account_id, pathToPhoto) };
      (async () => {
        await this.photosRepository.create(createPhotoDto);
      })();
    });
    try {
      fs.writeFileSync(path + "\\counter.txt", counter.toString(), "utf-8");
    } catch (e) {
      console.log(e);
    }
  }

  async findPhotoById(id: number) {
    const photo = await this.photosRepository.findByPk(id);
    return photo;
  }

  async removePhotoById(id: number) {
    await this.photosRepository.destroy({where: {id: id}});
  }


}
