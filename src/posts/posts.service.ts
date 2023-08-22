import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./models/posts.model";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postsRepository: typeof Post) {}

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.postsRepository.create(createPostDto);
    return post;
  }

  async findPostById(id: number) {
    const post = await this.postsRepository.findByPk(id);
    return post;
  }


}
