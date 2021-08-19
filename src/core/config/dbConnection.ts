import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        // connectionFactory: (connection) => {
        //   connection.plugin(require('mongoose-unique-validator'));
        //   return connection;
        // },
      }),
    }),
  ],
})
export class DatabaseModule {}
