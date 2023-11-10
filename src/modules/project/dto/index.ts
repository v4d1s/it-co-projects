import { IsString } from 'class-validator';

export class CreateProjectDTO {
    @IsString()
    name: string;
    @IsString()
    text: string;
    // @IsFile()
    image: File;
}