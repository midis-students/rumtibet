import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findById(_id: Types.ObjectId) {
    return this.userModel.findOne({ _id });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }
}
