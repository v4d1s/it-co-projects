import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import {ProjectModule} from "../project/project.module";
import {Project} from "../project/models/project.model";
import * as path from "path";
import {ServeStaticModule} from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../..', 'static'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        database: configService.get('db_name'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        synchronize: true,
        autoLoadModels: true,
        models: [Project],
      }),
    }),
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
