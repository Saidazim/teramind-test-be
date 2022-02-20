import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1416',
      database: 'teramind-test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
