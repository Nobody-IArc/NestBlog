import { readFile, writeFile } from 'fs/promises'; // fs/promises 모듈 임포트
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common'; // 의존성 주입을 위한 모듈
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPosts(): Promise<PostDto[]>;
  createPost(postDto: PostDto): any;
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string): Promise<any>;
  updatePost(id: string, postDto: PostDto): Promise<any>;
}

@Injectable() // 의존성 주입
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  // Get All
  async getAllPosts(): Promise<PostDto[]> {
    const dataList: string = await readFile(this.FILE_NAME, 'utf8');
    const postList = JSON.parse(dataList) as PostDto[];

    if (!postList) {
      throw new Error('No posts found.');
    }

    return postList;
  }

  // Create One
  async createPost(postDto: Omit<PostDto, 'id'>): Promise<void> {
    const postList = await this.getAllPosts();
    const id: string = (postList.length + 1).toString();
    const createPost = { id: id, ...postDto, createdAt: new Date() };
    postList.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(postList));
  }

  // Get One
  async getPost(id: string): Promise<PostDto> {
    const postList = await this.getAllPosts();
    const result = postList.find((post) => post.id === id);

    if (!result) {
      throw new Error('No post found.');
    }
    return result;
  }

  // Delete One
  async deletePost(id: string): Promise<any> {
    const postList = await this.getAllPosts();
    const filteredPostList = postList.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPostList));
  }

  // Update One
  async updatePost(id: string, postDto: Omit<PostDto, 'id'>): Promise<any> {
    const postList = await this.getAllPosts();
    const index = postList.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    if (!updatePost) {
      throw new Error('No post found.');
    }
    postList[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(postList));
  }
}

// MongoDB와 사용할 리파지터리
@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  // Get All
  async getAllPosts(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  // Create One
  async createPost(postDto: PostDto): Promise<void> {
    const createPost = {
      ...postDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.blogModel.create(createPost);
  }

  // Get One
  async getPost(id: string): Promise<PostDto> {
    const post = await this.blogModel.findById(id);
    if (!post) {
      throw new Error('No post found.');
    }

    return post;
  }

  // Delete One
  async deletePost(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id);
  }

  // Update One
  async updatePost(id: string, postDto: Omit<PostDto, 'id'>): Promise<void> {
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
