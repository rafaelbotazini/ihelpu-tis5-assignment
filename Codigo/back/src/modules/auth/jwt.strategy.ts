import { ExtractJwt, JwtPayload, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { ProfileService } from '../profile/profile.service';
import { IProfile } from 'modules/profile/profile.model';

/**
 * Jwt Strategy Class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param {ConfigService} configService
   * @param {ProfileService} profileService
   */
  constructor(
    readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('WEBTOKEN_SECRET_KEY'),
    });
  }

  /**
   * Checks if the bearer token is a valid token
   * @param {JwtPayload} jwtPayload validation method for jwt token
   * @param {(error: () => void, user: IProfile) => void} done callback to resolve the request user with
   * @returns {Promise<boolean>} whether or not to validate the jwt token
   */
  async validate(
    { iat, exp, id }: JwtPayload,
    done: (error: () => void, user: IProfile) => void,
  ): Promise<boolean> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.profileService.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    done(null, user);
    return true;
  }
}
