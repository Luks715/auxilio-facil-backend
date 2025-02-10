import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { JwtService } from '@nestjs/jwt';
import { register } from 'module';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserToken } from './types/UserToken';
import { UserPayload } from './types/UserPayload';


@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {} 

    async Login(dto: LoginUserDto): Promise<{ token: string; cidadao: any }> {
        const user = await this.validateUser(
            dto.email, 
            dto.senha
        );

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Incluindo o tipo do usuário no payload do token
        const payload: UserPayload = { email: user.email, sub: user.id, tipo: user.tipo };

        const jwtToken = this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: this.configService.get('JWT_SECRET'),
        });

        return { 
            token: jwtToken,
            cidadao: user.cidadaoId 
        };
    }
  
    async validateUser(email: string, senha: string) {
      const user = await this.UserService.findUserByEmail(email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (isPasswordValid) {
          return {
            ...user,
            senha: undefined,
          };
        }
      }
      return null;
    }

    async RegisterConnect(dto: ConnectUserDto): Promise<boolean> {
      const resposta = await this.UserService.connect(dto);
      return resposta;
    }

    async Register(dto: CreateUserDto): Promise<boolean> {
      const resposta = await this.UserService.create(dto);
      return resposta;
    }
}

