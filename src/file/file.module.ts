import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileRepository } from './file.repository';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]), AuthModule],
  controllers: [FileController],
  providers: [FileService],
})
export class UploadModule {}
