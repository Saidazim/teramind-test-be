import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { File } from './file.entity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  getFiles(user: User): Promise<File[]> {
    return this.find({ user });
  }

  getFileById(id: string, user: User): Promise<File> {
    return this.findOne({ id, user });
  }

  async uploadFile(file: Express.Multer.File, user: User): Promise<string> {
    const { size, buffer } = file;
    const uploadtime = new Date(Date.now()).toLocaleString();
    const fileData = this.create({
      filename: file.originalname,
      size,
      uploadtime,
      data: buffer,
      user,
    });
    await this.save(fileData);

    return fileData.id;
  }
}
