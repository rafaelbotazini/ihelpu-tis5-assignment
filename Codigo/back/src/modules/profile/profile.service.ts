import * as crypto from 'crypto';
import * as gravatar from 'gravatar';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { IProfile } from './profile.model';
import { RegisterPayload } from 'modules/auth/payload/register.payload';
import { AppRoles } from '../app/app.roles';
import { PatchProfilePayload } from './payload/patch.profile.payload';
import { IGenericMessageBody } from 'common/interfaces/IGenericMessageBody';
import { IRoom } from 'modules/room/room.model';

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<IProfile>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).populate('groups').exec();
  }

  /**
   * Fetches a profile from database by email
   * @param {string} email
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmail(email: string): Promise<IProfile> {
    return this.profileModel.findOne({ email }).exec();
  }

  /**
   * Fetches a profile by their email and hashed password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmailAndPass(email: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        email,
        password: this.hashPassword(password),
      })
      .exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        'The account with the provided email currently exists. Please choose another one.',
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: this.hashPassword(payload.password),
      avatar: gravatar.url(payload.email, {
        protocol: 'http',
        s: '200',
        r: 'pg',
        d: '404',
      }),
      roles: AppRoles.DEFAULT,
    });

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(payload: PatchProfilePayload): Promise<IProfile> {
    const { email } = payload;

    const updatedProfile = await this.profileModel.updateOne(
      { email },
      payload,
    );

    if (updatedProfile.nModified !== 1) {
      throw new BadRequestException(
        'The profile with that email does not exist in the system.',
      );
    }

    return this.getByEmail(email);
  }

  /**
   * Delete profile given a email
   * @param {string} email
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(email: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ email }).then((profile) => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${email} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the name of ${email}.`,
        );
      }
    });
  }

  /**
   * Remove a room reference from user profile
   * @param user the user
   * @param roomId the room id
   */
  async leaveRoom(user: IProfile, room: IRoom): Promise<void> {
    await this.profileModel.findByIdAndUpdate(user.id, {
      $pullAll: { groups: [room] },
    });
  }

  private hashPassword(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }
}
