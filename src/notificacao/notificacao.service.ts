import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificacaoDto: CreateNotificacaoDto) {
    const notificacao = await this.prisma.notificacao.create({
      data: createNotificacaoDto
    });
    return true;
  }

  findAll() {
    return `This action returns all notificacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacoe`;
  }

  update(id: number, updateNotificacoeDto: UpdateNotificacaoDto) {
    return `This action updates a #${id} notificacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacoe`;
  }
}
