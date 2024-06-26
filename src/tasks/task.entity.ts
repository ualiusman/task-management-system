import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tilte: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

}