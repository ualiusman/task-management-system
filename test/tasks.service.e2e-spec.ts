import { Test } from "@nestjs/testing";
import { GetTasksFilterDto } from "src/tasks/dto/get-tasks-filter.dto";
import { TaskStatus } from "src/tasks/task-status.enum";
import { TaskRepository } from "src/tasks/task.repository";
import { TasksService } from "src/tasks/tasks.service";

const mockUser = { username: 'Test user' };

const mockTaskRepository = () => ({

    getTasks: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;


    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ],
        }).compile();



        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository)
    });


    describe('getTasks', () => {
        it('get all tasks from the repository', () => {
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'do' };
            tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();

        });

    });

});