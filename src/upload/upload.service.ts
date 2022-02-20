import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<void> {
    if (!file) {
      throw new BadRequestException('Provided item is not a plain text file.');
    }

    await this.fileRepository.uploadFile(file);
  }
}
