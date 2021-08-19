import { HookNextFunction } from 'mongoose';
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import tryy from 'src/utils/tryCatch';
import { BaseEntity } from 'src/core/common/baseEntity';
import { ServerException } from '@src/utils/exceptions/server.exception';

const logger = new Logger('userEntity');
// Todo: Global Auth & Public Decorator
@Schema()
export class User extends BaseEntity {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, trim: true })
  userName: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    // uniqueCaseInsensitive: true,
  })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop()
  accessToken: string;

  @Prop({ default: null })
  deletedAt: Date;

  // @Prop({ required: true })
  // hash: string;
  isPasswordValid: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) return next();

    const promise = argon2.hash(this.password);
    const [err, hashedPassword] = await tryy(promise);

    if (err) next(err);

    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.isPasswordValid = async function (plainPassword) {
  const promise = argon2.verify(this.password, plainPassword);
  const [error, status] = await tryy(promise);

  if (error) {
    logger.error(error);
    throw new ServerException();
  }

  return status;
};

UserSchema.set('toJSON', {
  transform: function (doc, obj: User) {
    delete obj.password;
    return obj;
  },
});
