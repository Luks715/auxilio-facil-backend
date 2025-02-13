import { Module } from '@nestjs/common';
import { CidadaoService } from './cidadao.service';
import { CidadaoController } from './cidadao.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CidadaoController],
  providers: [CidadaoService, PrismaService],
  exports: [CidadaoService],
})
export class CidadaoModule {}
