import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(Task)
        private taskRepositoy: TaskRepository) {

    }


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.taskRepositoy.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('task.tilte LIKE :search  OR task.description LIKE :search', { search: `%${search}%` });

        }
        const tasks = await query.getMany();
        return tasks;
    }

    async getTaskById(id: number, user: User): Promise<Task> {

        const found = await this.taskRepositoy.findOne({ where: { id, user: { id: user.id } } });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id} not found" `);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Task {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.tilte = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        console.log("user--", task);

        this.taskRepositoy.save(task);


        return task;

    }

    async deleteTask(id: number, user: User): Promise<void> {
        const found = this.getTaskById(id, user);
        const result = await this.taskRepositoy.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id '${id}' not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        return this.taskRepositoy.save(task);
    }
}
