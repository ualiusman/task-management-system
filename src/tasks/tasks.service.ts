import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

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

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepositoy.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id} not found" `);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.tilte = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.save();

        return task;

    }

    async deleteTask(id: number): Promise<void> {
        const found = this.getTaskById(id);
        const result = await this.taskRepositoy.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id '${id}' not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return this.taskRepositoy.save(task);
    }
}
