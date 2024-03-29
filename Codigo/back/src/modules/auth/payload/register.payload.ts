import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

/**
 * Register Payload Class
 */
export class RegisterPayload {
  /**
   * Email field
   */
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Username field
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  /**
   * University field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  university: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
