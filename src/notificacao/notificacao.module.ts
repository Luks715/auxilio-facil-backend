import { Module } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NotificacaoController],
  providers: [NotificacaoService, PrismaService],
})
export class NotificacaoModule {}
