import { Exclude } from 'class-transformer';
import { File } from 'src/file/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => File, (file) => file.user, { eager: false })
  @Exclude()
  files: File[];
}
