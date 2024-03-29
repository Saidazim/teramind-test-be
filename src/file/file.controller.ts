import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
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
import { FileService } from './file.service';

@Controller('files')
@UseGuards(AuthGuard())
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getFiles(@GetUser() user: User): Promise<File[]> {
    return this.fileService.getFiles(user);
  }

  @Get(':id')
  getFileById(@Param('id') id: string, @GetUser() user: User): Promise<File> {
    return this.fileService.getFileById(id, user);
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
  ): Promise<string> {
    return this.fileService.uploadFile(file, user);
  }
}
