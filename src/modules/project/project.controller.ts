import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {CreateProjectDTO} from "./dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get('projects')
    getArticles() {
        return this.projectService.getProjects();
    }

    @Get('project/:id')
    getArticle(@Param() params: any) {
        return this.projectService.getProjectById(params.id);
    }

    @Post('project')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    createArticles(@UploadedFiles() files, @Body() dto: CreateProjectDTO) {
        let {image} = files
        if (image == undefined) {
            return this.projectService.createProject(dto, '');
        }
        return this.projectService.createProject(dto, image[0]);
    }

    @Patch('project/:id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    updateArticle(@Body() dto, @Param() params: any, @UploadedFiles() files) {
        const {image} = files
        if (image == undefined) {
            return this.projectService.updateProject(params.id, dto, '');
        }
        return this.projectService.updateProject(params.id, dto, image[0]);
    }

    @Delete('project/:id')
    deleteArticle(@Param() params: any) {
        return this.projectService.deleteProject(params.id);
    }
}
