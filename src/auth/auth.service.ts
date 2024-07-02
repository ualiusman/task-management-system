import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

        try {
            await user.save();
        } catch (error) {
            if (error.code == 23505) {
                throw new ConflictException('Username alreay exists');
            } else {
                throw new InternalServerErrorException();

            }
        }

    }
}
