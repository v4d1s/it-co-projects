import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Project extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @Column
    name: string;
    @Column
    text: string;
    @Column
    image: string;
}