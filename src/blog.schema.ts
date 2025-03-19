import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document; // Blog 이면서 Document 인 타입, Intersection type

@Schema() // Schema 를 나타내는 Decorator
export class Blog {
  @Prop() // Property (Field) 의 약어
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

// SchemaFactory (Class -> Schema 로 변환하는 모듈) 를 아용해 Schema 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);
