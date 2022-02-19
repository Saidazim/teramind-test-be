import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, {
    message: 'Username is too short',
  })
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
