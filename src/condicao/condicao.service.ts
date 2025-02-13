import { Injectable } from '@nestjs/common';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CondicaoService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCondicaoDto: CreateCondicaoDto) {
    return 'This action adds a new condicao';
  }

  async findAll() {
    const condicoes = await this.prisma.condicao.findMany();
    return condicoes;
  }

  findOne(id: number) {
    return `This action returns a #${id} condicao`;
  }

  update(id: number, updateCondicaoDto: UpdateCondicaoDto) {
    return `This action updates a #${id} condicao`;
  }

  remove(id: number) {
    return `This action removes a #${id} condicao`;
  }
}
