import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Project} from "./models/project.model";
import {CreateProjectDTO} from "./dto";
import * as path from "path";
import * as uuid from 'uuid';
import * as fs from "fs";

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project) private readonly projectRepository: typeof Project,
    ) {}

    async createProject(dto: CreateProjectDTO, picture): Promise<CreateProjectDTO> {
        let imagePath: string = ''
        if (picture == '') {
            imagePath = 'noimage.jpeg'
        } else {
            imagePath = this.createFile(picture)
        }
        const newProject = {
            name: dto.name,
            text: dto.text,
            image: imagePath,
        };
        await this.projectRepository.create(newProject);
        return dto;
    }

    async getProjects() {
        return this.projectRepository.findAll();
    }

    async getProjectById(id: number) {
        return this.projectRepository.findOne({ where: { id } });
    }

    async updateProject(id: number, dto: CreateProjectDTO, picture) {
        // @ts-ignore
        if (dto.deleteImage) {
            const fileName = await this.projectRepository.findOne({ where: { id } }).then(result => result.image)
            if (fileName != 'noimage.jpeg') {
                this.deleteFile(fileName)
            }
            await this.projectRepository.update({image: 'noimage.jpeg'}, { where: { id } });
        }
        if (picture == '') {
            await this.projectRepository.update({name: dto.name, text: dto.text}, { where: { id } });
        } else {
            const fileName = await this.projectRepository.findOne({ where: { id } }).then(result => result.image)
            this.deleteFile(fileName)
            const imagePath = this.createFile(picture)
            await this.projectRepository.update({name: dto.name, text: dto.text, image: imagePath}, { where: { id } });
        }
        return dto;
    }

    async deleteProject(id: number) {
        const fileName = await this.projectRepository.findOne({ where: { id } }).then(result => result.image)
        this.deleteFile(fileName)
        // console.log('DELETED!!!')
        return this.projectRepository.destroy({ where: { id } });
    }

    createFile(file): string {
        const fileExtension = file.originalname.split('.').pop()
        const fileName = uuid.v4() + '.' + fileExtension
        const filePath = path.resolve(__dirname, '../../..', 'static')
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true})
        }
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
        return fileName
    }

    deleteFile(fileName) {
        const filePath = path.resolve(__dirname, '../../../static', fileName)
        if (fs.existsSync(filePath)) {
            if (fileName !== 'noimage.jpeg') {
                fs.unlinkSync(filePath)
            }
        }
    }
}
