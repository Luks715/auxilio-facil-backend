import { Module } from '@nestjs/common';
import { CondicaoService } from './condicao.service';
import { CondicaoController } from './condicao.controller';

@Module({
  controllers: [CondicaoController],
  providers: [CondicaoService],
})
export class CondicaoModule {}
