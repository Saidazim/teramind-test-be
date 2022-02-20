import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileRepository } from './file.repository';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]), AuthModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
