import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { PatchProfilePayload } from './payload/patch.profile.payload';
import { IProfile } from './profile.model';
import { IGenericMessageBody } from 'modules/common/interfaces/IGenericMessageBody';

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags('profile')
@Controller('api/profile')
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Retrieves a particular profile
   * @param email the profile given email to fetch
   * @returns {Promise<IProfile>} queried profile data
   */
  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getProfile(@Param('email') email: string): Promise<IProfile> {
    const profile = await this.profileService.getByEmail(email);
    if (!profile) {
      throw new BadRequestException(
        'The profile with that email could not be found.',
      );
    }
    return profile;
  }

  /**
   * Edit a profile
   * @param {RegisterPayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @UseRoles({
    resource: 'profiles',
    action: 'update',
    possession: 'own',
  })
  @ApiResponse({ status: 200, description: 'Patch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Patch Profile Request Failed' })
  async patchProfile(@Body() payload: PatchProfilePayload): Promise<IProfile> {
    return await this.profileService.edit(payload);
  }

  /**
   * Removes a profile from the database
   * @param {string} email the email to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the profile has been deleted
   */
  @Delete(':email')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    resource: 'profiles',
    action: 'delete',
    possession: 'any',
  })
  @ApiResponse({ status: 200, description: 'Delete Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Profile Request Failed' })
  async delete(@Param('email') email: string): Promise<IGenericMessageBody> {
    return await this.profileService.delete(email);
  }
}
