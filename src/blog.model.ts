export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date; // '?'가 붙으면 null 허용
}
