import { Request } from '@nestjs/common';
import { IProfile } from 'modules/profile/profile.model';

export default interface GenericRequest extends Request {
  user: IProfile;
}
