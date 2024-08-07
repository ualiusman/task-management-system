import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";


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

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User

}