import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/config/dbConnection';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_URL: Joi.string().required(), // connection string
        // JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        // JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        // JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        // JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    // Todo: Health Check i.e. nestjs/terminus
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
