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
  blogService: BlogService;

  // 생성자로 blogService 생성
  // 추후에 의존성 주입 방식으로 변경
  constructor() {
    this.blogService = new BlogService();
  }

  @Get() // Get Decorator, 서버 경로에 대해 getAllPosts()
  getAllPosts() {
    console.log('Get all posts');
    return this.blogService.getAllPosts(); // Service 에서 가져온 메서드
  }

  @Post() // 서버 경로에 createPost()
  createPost(@Body() postDto: PostDto) {
    console.log('Create new Post');
    this.blogService.createPost(postDto); // Service 에서 가져온 메서드
    return 'success';
  }

  @Get('/:id') // '/:id' 경로에 getPost()
  getPost(@Param('id') id: string) {
    console.log(`Get [id: ${id}]'s Post`);
    return this.blogService.getPost(id); // Service 에서 가져온 메서드
  }

  @Delete('/:id') // '/:id' 경로에 deletePost()
  deletePost(@Param('id') id: string) {
    console.log('Delete post');
    this.blogService.deletePost(id); // Service 에서 가져온 메서드
    return 'success';
  }

  @Put('/:id') // '/:id' 경로에 updatePost
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log('Update Post ', id, postDto);
    return this.blogService.updatePost(id, postDto); // Service 에서 가져온 메서드
  }
}
