import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Photo } from "./models/photos.model";
import * as fs from "fs";
import { Express } from "express";
import * as sharp from "sharp";
import { CreatePhotosDto } from "./dto/create-photos.dto";
import { AccountsService } from "../accounts/accounts.service";
import * as path from "path";
import { env } from "process";

@Injectable()
export class PhotosService {

  pathToPhotos: string;
  counterName: string = "counter.txt";

  constructor(@InjectModel(Photo) private photosRepository: typeof Photo, private accountsService: AccountsService) {
    const pathToProject = this.stepBackNSteps(2, __dirname);
    this.pathToPhotos = path.join(pathToProject, "assets", env["PHOTO_FOLDER"]);
    this.createFolder(this.pathToPhotos);
  }

  private stepBackNSteps(steps: number, pathArg: string) {
    let result: string = pathArg;
    for (let i = 0; i < steps; i++) {
      result = path.join(result, "..");
    }
    return result;
  }

  async uploadPhotos(files: Array<Express.Multer.File>, email: string, account_id: number) {
    const pathArg = path.join(this.pathToPhotos, email);
    this.createFolder(pathArg);
    let counter: string;
    try {
      counter = this.getCounter(path.join(pathArg, this.counterName));
    } catch (e) {
      counter = this.createCounterFile(path.join(pathArg, this.counterName));
    }
    let num: number = parseInt(counter);
    for (let i = 1; i <= files.length; i++) {
      const photo = await this.getWebpPhoto(files[i - 1]);
      sharp(photo).toFile(path.join(pathArg, num.toString() + ".webp"),
        (err, info) => { console.error(err); });
      await this.savePathInDB(path.join(pathArg, num.toString()) + ".webp", account_id);
      num++;
    }
    this.setCounter(path.join(pathArg, this.counterName), num);
  }

  async getWebpPhoto(file: Express.Multer.File) {
    const buffer = await sharp(file.buffer).toFormat('webp').toBuffer();
    return buffer;
  }


  async uploadAvatar(file: Express.Multer.File, email: string, account_id: number) {
    const pathArg = path.join(this.pathToPhotos, email);
    this.createFolder(pathArg);
    let counter: string;
    try {
      counter = this.getCounter(path.join(pathArg, this.counterName));
    } catch (e) {
      counter = this.createCounterFile(path.join(pathArg, this.counterName));
    }
    let num: number = parseInt(counter);
    const photo = await this.getWebpPhoto(file);
    sharp(photo).toFile(path.join(pathArg, num.toString() + ".webp"),
      (err, info) => { console.error(err); });
    const photoFromDB = await this.savePathInDB(path.join(pathArg, num.toString())  + ".webp", account_id);
    num++;
    this.setCounter(path.join(pathArg, this.counterName), num);
    const account = await this.accountsService.findAccountById(account_id);
    await account.$set('avatar', [photoFromDB.id]);
  }

  private setCounter(path: string, number: number) {
    try {
      fs.writeFileSync(path, number.toString());
    } catch (err) {
      console.error(err);
    }
  }

  private createCounterFile(path: string) {
    try {
      fs.writeFileSync(path, "1");
      return "1";
    } catch (err) {
      console.error(err);
    }
  }

  private getCounter(path: string) {
    try {
      const data = fs.readFileSync(path, "utf-8");
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  private createFolder(pathArg: string) {
    if (!fs.existsSync(pathArg)) {
      try {
        fs.mkdirSync(pathArg, { recursive: true });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async savePathInDB(path: string, account_id: number) {
    const photo = await this.photosRepository.create({ path: path, account_id: account_id });
    return photo;
  }

  async getAvatarByAccountId(account_id: number) {
    const account = await this.accountsService.findAccountById(account_id);
    const photo_id =  account.avatar_id;
    const photo = await this.photosRepository.findByPk(photo_id);
    return photo.path;
  }

  async getPhotosByAccountId(account_id: number) {
    const photos = await this.photosRepository.findAll({where: {account_id: account_id}});
    return photos;
  }

}
