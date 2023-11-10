import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {Project} from "./models/project.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [ProjectModule, SequelizeModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
