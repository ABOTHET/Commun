import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Payload } from "../decorators/account/payload.decorator";
import { Payload as Pd } from "../jwt-refresh-tokens/payload/payload";

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Payload() payload: Pd) {
    createPostDto.account_id = payload.id;
    const post = await this.postsService.createPost(createPostDto);
    return post;
  }

  @Get("/:id")
  async findPostById(@Param("id") id: number) {
    const post = await this.postsService.findPostById(id);
    return post;
  }

}
