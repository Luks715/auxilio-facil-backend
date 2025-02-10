import { Module } from '@nestjs/common';
import { AuxilioService } from './auxilio.service';
import { AuxilioController } from './auxilio.controller';

@Module({
  controllers: [AuxilioController],
  providers: [AuxilioService],
})
export class AuxilioModule {}
