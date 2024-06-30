import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private taskRepositoy: UserRepository) {

    }
}
