// analise.module.ts
import { Module } from '@nestjs/common';
import { AnaliseService } from './analise.service';
import { AnaliseController } from './analise.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CidadaoService } from 'src/cidadao/cidadao.service';

@Module({
  imports: [],
  controllers: [AnaliseController],
  providers: [AnaliseService, PrismaService, CidadaoService],
})
export class AnaliseModule {}
