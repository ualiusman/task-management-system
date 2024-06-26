import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "uali",
    database: "taskmanagement",
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true
};