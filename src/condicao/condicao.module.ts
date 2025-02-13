import { Module } from '@nestjs/common';
import { CondicaoService } from './condicao.service';
import { CondicaoController } from './condicao.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CondicaoController],
  providers: [CondicaoService, PrismaService],
})
export class CondicaoModule {}
