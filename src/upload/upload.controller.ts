import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { File } from './file.entity';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get()
  getFiles(@GetUser() user: User): Promise<File[]> {
    return this.uploadService.getFiles(user);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5000000,
      },
      fileFilter(req, file, cb) {
        const acceptFile =
          file.mimetype === 'text/plain' && file.originalname.endsWith('.txt');
        cb(undefined, acceptFile);
      },
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<void> {
    return this.uploadService.uploadFile(file, user);
  }
}
