import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guards';
import { Public } from '../auth/decorators/isPublic.decorator';
import { Cidadao } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    //@Public()
    //@HttpCode(HttpStatus.OK)
    //@Post('login')
    //async Login(@Body() dto: LoginUserDto): Promise<{ token: string; cidadao: Cidadao }>  {
    //    const tokenEcidadao = await this.authService.Login(dto);
    //    return tokenEcidadao;
    //}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: { cpf: string, senha: string }) {
        const { cpf, senha } = loginDto;
        return await this.authService.Login(cpf, senha);
    }
     
    @Public()
    @Post('register')
    async Register(@Body() dto: CreateUserDto) {
        const resposta = await this.authService.Register(dto);
        return resposta;
    }

    @Public()
    @Post('register-connect')
    async RegisterConnect(@Body() dto: ConnectUserDto) {
        const resposta = await this.authService.RegisterConnect(dto);
        return resposta;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
