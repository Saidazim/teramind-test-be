import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  uploadtime: string;

  @Column({
    type: 'bytea',
  })
  @Exclude({ toPlainOnly: true })
  data: Uint8Array;

  @ManyToOne((type) => User, (user) => user.files, { eager: false })
  @Exclude()
  user: User;
}
