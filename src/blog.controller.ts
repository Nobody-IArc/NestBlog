import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common'; // Nest.js 컨트롤러 요소 Import

import { BlogService } from './blog.service';
import { PostDto } from './blog.model';

@Controller('blog') // Controller Decorator

// export BlogController 로 다른 코드에서 사용 가능
export class BlogController {
  /*  의존성 주입으로 인한 기존 생성자 코드 삭제
  blogService: BlogService;

   생성자로 blogService 생성
   추후에 의존성 주입 방식으로 변경
  constructor() {
    this.blogService = new BlogService();
  }
  */

  // 의존성 주입으로 인한 새로운 생성자
  constructor(private blogService: BlogService) {}

  @Get() // Get Decorator, 서버 경로에 대해 getAllPosts()
  async getAllPosts() {
    console.log('Get all posts');
    const postList = await this.blogService.getAllPosts(); // Service 에서 가져온 메서드
    console.log(postList);
    return postList;
  }

  @Post() // 서버 경로에 createPost()
  async createPost(@Body() postDto: PostDto) {
    console.log('Create new Post');
    await this.blogService.createPost(postDto); // Service 에서 가져온 메서드
    return 'success';
  }

  @Get('/:id') // '/:id' 경로에 getPost()
  async getPost(@Param('id') id: string) {
    console.log(`Get [id: ${id}]'s Post`);
    const post = await this.blogService.getPost(id); // Service 에서 가져온 메서드
    console.log(post);
    return post;
  }

  @Delete('/:id') // '/:id' 경로에 deletePost()
  async deletePost(@Param('id') id: string) {
    console.log('Delete post');
    await this.blogService.deletePost(id); // Service 에서 가져온 메서드
    return 'success';
  }

  @Put('/:id') // '/:id' 경로에 updatePost
  async updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log('Update Post ', id, postDto);
    return await this.blogService.updatePost(id, postDto); // Service 에서 가져온 메서드
  }
}
