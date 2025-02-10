import { Injectable } from '@nestjs/common';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CidadaoService {
  constructor(private readonly prisma: PrismaService) {}
  

  async create(createCidadaoDto: CreateCidadaoDto) {
    const cidadao = await this.prisma.cidadao.create({
      data: createCidadaoDto,
    });
    return cidadao;
  }

  async findDependentes(id: number) {
    const dependentes = await this.prisma.cidadao.findMany({
      where: {responsavelId: id}
    });
    return dependentes;
  }

  async findCidadaoByCpf(cpf: string) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { cpf }
    });
    return cidadao;
  }

  async findAll() {
    const cidadaos = await this.prisma.cidadao.findMany();
    return cidadaos;
  }

  async findOne(id: number) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { id }
    });
    return cidadao;
  }

  async update(id: number, updateCidadaoDto: UpdateCidadaoDto) {
    const cidadao = await this.prisma.cidadao.update({
      where: { id },
      data: updateCidadaoDto,
    });
    return cidadao;
  }

  async remove(id: number) {
    const cidadao = await this.prisma.cidadao.delete({
      where: { id },
    });
    return cidadao;
  }
}
