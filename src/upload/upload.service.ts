import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async uploadFile(file: Express.Multer.File, user: User): Promise<void> {
    if (!file) {
      throw new BadRequestException('Provided item is not a plain text file.');
    }

    await this.fileRepository.uploadFile(file, user);
  }
}
