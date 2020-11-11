import { Controller, Get, Req, UseGuards, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import GenericRequest from 'common/interfaces/GenericRequest';
import { IProfile } from 'modules/profile/profile.model';

/**
 * App Controller
 */
@Controller('/')
@ApiBearerAuth()
export class AppController {
  /**
   * Constructor
   * @param appService
   * @param profileService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns the an environment variable from config file
   * @returns {string} the application environment url
   */
  @Get()
  @Redirect('/api/docs')
  @ApiResponse({ status: 302, description: 'Redirect to docs page' })
  home(): void {
    return;
  }

  /**
   * Returns the an environment variable from config file
   * @returns {string} the application environment url
   */
  @Get('api')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getString(): string {
    return this.appService.root();
  }

  /**
   * Fetches request metadata
   * @param {Req} req the request body
   * @returns {IProfile} the request user populated from the passport module
   */
  @Get('api/request/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getProfile(@Req() req: GenericRequest): IProfile {
    return req.user;
  }
}
