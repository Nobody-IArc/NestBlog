import { readFile, writeFile } from 'fs/promises'; // fs/promises 모듈 임포트
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPosts(): Promise<PostDto[]>;
  createPost(postDto: PostDto): any;
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string): Promise<any>;
  updatePost(id: string, postDto: PostDto): Promise<any>;
}

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
