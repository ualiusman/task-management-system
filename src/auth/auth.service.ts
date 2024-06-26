import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserRepository)
        private userRepositoy: UserRepository) {

    }


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.password = password;
        await user.save();

    }
}
