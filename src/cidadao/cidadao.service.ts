import { Injectable } from '@nestjs/common';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDependenteDto } from './dto/create-dependente.dto';

@Injectable()
export class CidadaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCidadaoDto: CreateCidadaoDto) {
    const cidadao = await this.prisma.cidadao.create({
      data: createCidadaoDto,
    });
    return cidadao;
  }

  async createDependente(createDependenteDto: CreateDependenteDto) {
    const cidadaoExistente = await this.findCidadaoByCpf(createDependenteDto.createCidadao.cpf);
  
    if (cidadaoExistente) {
      return false;
    } else {
      const dependente = await this.create(createDependenteDto.createCidadao);
  
      await this.prisma.cidadaoDependente.create({
        data: {
          responsavelId: createDependenteDto.responsavelId,
          dependenteId: dependente.id,
          status: createDependenteDto.status,
        },
      });
  
      return dependente; // Retorna o dependente recém-criado
    }
  }

  async findCidadaoByCpf(cpf: string) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { cpf },
      include: {
        dependentes: true,
        auxilios:    true, 
        enderecos:   true, 
        condicoes:   true, 
      },
    });
    return cidadao;
  }

  async findAll() {
    const cidadaos = await this.prisma.cidadao.findMany({
      include: {
        dependentes: true,
        auxilios:    true, 
        enderecos:   true, 
        condicoes:   true, 
      },
    });
    return cidadaos;
  }

  async findOne(id: number) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { id },
      include: {
        dependentes: true,
        auxilios:    true, 
        enderecos:   true, 
        condicoes:   true, 
      },
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
