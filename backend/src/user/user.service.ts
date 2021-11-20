import { Injectable, NotAcceptableException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createNewUser(newUserData: any) {
    const user = new this.userModel(newUserData);
    return user.save();
  }

  async findOne(username?: string, email?: string) {
    try {
      let user = null;
      if (username) {
        user = await this.userModel.findOne({
          username: username,
        });
      }

      if (user == null && email) {
        user = await this.userModel.findOne({ email: email });
      }

      return user;
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
