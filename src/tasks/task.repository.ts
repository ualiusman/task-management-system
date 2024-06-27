import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";

export class TaskRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
    }


    public async findAll(): Promise<Task[]> {
        return this.find();
    }

    public async findById(id: number): Promise<Task | null> {
        return await this.findOneBy({ id: id });
    }

    public async store(task: CreateTaskDto): Promise<Task> {
        const newUser = this.create(task);
        return this.save(newUser);
    }

    public async updateOne(
        id: number,
        task: Task
    ): Promise<Task | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
        Object.assign(user, task);
        return this.save(user);
    }

    public async destroy(id: number): Promise<void> {
        await this.delete(id);
    }
}