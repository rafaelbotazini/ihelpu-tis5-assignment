import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsAlphanumeric } from 'class-validator';

/**
 * Patch Profile Payload Class
 */
export class PatchProfilePayload {
  /**
   * Email field
   */
  @ApiProperty()
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
}
