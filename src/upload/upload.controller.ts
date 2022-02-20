import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

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
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.uploadService.uploadFile(file);
  }
}
