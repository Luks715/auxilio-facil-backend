import { Module } from '@nestjs/common';
import { AuxilioService } from './auxilio.service';
import { AuxilioController } from './auxilio.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuxilioController],
  providers: [AuxilioService, PrismaService],
})
export class AuxilioModule {}
