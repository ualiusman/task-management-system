import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }



    @Post("/signup")
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {

        return this.authService.signUp(authCredentialsDto);
    }

    @Post("/signin")
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.validateUserPassword(authCredentialsDto)
    }

    @Post("/test")
    @UseGuards(AuthGuard())
    async test(@Req() req) {
        console.log(req);

    }
}
