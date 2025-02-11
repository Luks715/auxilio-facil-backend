// analise.module.ts
import { Module } from '@nestjs/common';
import { AnaliseService } from './analise.service';
import { AnaliseController } from './analise.controller';

@Module({
  imports: [],
  controllers: [AnaliseController],
  providers: [AnaliseService],
})
export class AnaliseModule {}
