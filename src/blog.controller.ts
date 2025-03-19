import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get()
  getAllPosts() {
    console.log('Get all posts');
  }

  @Post()
  createPost(@Body() post: any) {
    console.log('Create new Post');
    console.log(post);
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`Get [id: ${id}]'s Post`);
  }

  @Delete('/:id')
  deletePost() {
    console.log('Delete post');
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() post: any) {
    console.log(`Update [id: ${id}]'s Post`);
    console.log(post);
  }
}
