import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  gender: boolean;

  @Prop()
  region: string;

  @Prop()
  city: string;

  @Prop()
  birth_date: Date;

  @Prop()
  phone: string;

  @Prop({ type: Date, default: Date.now })
  lastActiveAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
