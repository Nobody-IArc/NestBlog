import { PostDto } from './blog.model'; // Model Import
import { BlogFileRepository } from './blog.repository';
import { Injectable } from '@nestjs/common'; // 의존성 주입을 위한 모듈

@Injectable()
export class BlogService {
  // posts: PostDto[] = [];

  /* 의존성 주입으로 인한 기존 생성자 코드 삭제
     blogFileRepository: BlogFileRepository;
  
     constructor() {
     this.blogFileRepository = new BlogFileRepository();
   }
   */

  // 의존성 주입으로 인한 새로운 생성자
  constructor(private blogFileRepository: BlogFileRepository) {}

  async getAllPosts() {
    // return this.posts;

    return await this.blogFileRepository.getAllPosts();
  }

  // Ignore: Omit 으로 'id', 'createdAt' 속성 제외 후 가져오기
  // Omit 제외
  async createPost(postDto: PostDto): Promise<void> {
    // const newId: string = (this.posts.length + 1).toString();
    // const newPost: PostDto = { id: newId, createdAt: new Date(), ...postDto };
    // this.posts.push(newPost);

    await this.blogFileRepository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto> {
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;

    return await this.blogFileRepository.getPost(id);
  }

  async deletePost(id: string): Promise<void> {
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];

    await this.blogFileRepository.deletePost(id);
  }

  // Ignore: Omit 으로 'id' 가져오지 않기
  // Omit 제거
  async updatePost(id: string, postDto: PostDto): Promise<void> {
    // const updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { id, ...postDto, updatedAt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;

    await this.blogFileRepository.updatePost(id, postDto);
  }
}
