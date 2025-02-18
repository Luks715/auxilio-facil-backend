import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CidadaoService } from 'src/cidadao/cidadao.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CidadaoService],
})
export class UserModule {}
