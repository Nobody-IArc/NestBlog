import { PostDto } from './blog.model'; // Model Import

export class BlogService {
  posts: PostDto[] = [];

  getAllPosts() {
    return this.posts;
  }

  // Omit 으로 'id', 'createdAt' 속성 제외 후 가져오기
  createPost(postDto: Omit<PostDto, 'id' | 'createdAt'>) {
    const newId: string = (this.posts.length + 1).toString();
    const newPost: PostDto = { id: newId, createdAt: new Date(), ...postDto };
    this.posts.push(newPost);
  }

  getPost(id: any) {
    const post = this.posts.find((post) => {
      return post.id === id;
    });
    console.log(post);
    return post;
  }

  deletePost(id: any) {
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
  }

  // Omit 으로 'id' 가져오지 않기
  updatePost(id: string, postDto: Omit<PostDto, 'id'>) {
    const updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    this.posts[updateIndex] = updatePost;
    return updatePost;
  }
}
