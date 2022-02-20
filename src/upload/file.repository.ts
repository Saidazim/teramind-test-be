import { EntityRepository, Repository } from 'typeorm';
import { File } from './file.entity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  async uploadFile(file: Express.Multer.File): Promise<void> {
    const { size, buffer } = file;
    const uploadtime = new Date(Date.now()).toLocaleString();
    const fileData = this.create({
      filename: file.originalname,
      size,
      uploadtime,
      data: buffer,
    });

    await this.save(fileData);
  }
}
