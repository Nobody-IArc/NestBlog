import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository} from './blog.repository';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository], // 의존성 주입을 위해 Provider 추가
})
export class AppModule {}
