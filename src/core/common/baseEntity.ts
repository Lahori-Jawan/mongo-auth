import { Schema, Prop } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class BaseEntity extends Document {
  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}
